import Ember from 'ember';
import { EventOptions } from './-private/types';

const { merge } = Ember;
const DEFAULT_EVENT_OPTIONS: EventOptions = { bubbles: true, cancelable: true };
const KEYBOARD_EVENT_TYPES = ['keydown', 'keypress', 'keyup'];
const MOUSE_EVENT_TYPES = ['click', 'mousedown', 'mouseup', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover'];

export function fireEvent(element: HTMLElement, type: string, options: EventOptions = {}): Event {
  if (!element) {
    return;
  }
  let event: Event;
  if (KEYBOARD_EVENT_TYPES.indexOf(type) > -1) {
    event = buildKeyboardEvent(type, options);
  } else if (MOUSE_EVENT_TYPES.indexOf(type) > -1) {
    let rect = element.getBoundingClientRect();
    let x = rect.left + 1;
    let y = rect.top + 1;
    let simulatedCoordinates = {
      screenX: x + 5,
      screenY: y + 95,
      clientX: x,
      clientY: y
    };
    event = buildMouseEvent(type, merge(simulatedCoordinates, options));
  } else {
    event = buildBasicEvent(type, options);
  }
  element.dispatchEvent(event);
  return event;
}

function buildBasicEvent(type: string, { bubbles = true, cancelable = true, ...otherOptions }: EventOptions = {}): Event {
  let event = document.createEvent('Events');

  // bubbles and cancelable are readonly, so they can be set when initializing event
  event.initEvent(type, bubbles, cancelable);
  merge(event, otherOptions);
  return event;
}

function buildMouseEvent(type: string, options: EventOptions = {}): Event {
  try {
    let event = document.createEvent('MouseEvents');
    let eventOpts: EventOptions = merge(merge({}, DEFAULT_EVENT_OPTIONS), options);
    event.initMouseEvent(
      type,
      eventOpts.bubbles,
      eventOpts.cancelable,
      window,
      eventOpts.detail,
      eventOpts.screenX,
      eventOpts.screenY,
      eventOpts.clientX,
      eventOpts.clientY,
      eventOpts.ctrlKey,
      eventOpts.altKey,
      eventOpts.shiftKey,
      eventOpts.metaKey,
      eventOpts.button,
      eventOpts.relatedTarget);
    return event;
  } catch(e) {
    return buildBasicEvent(type, options);
  }
}

/*
  @method buildKeyboardEvent
  @param {String} type
  @param {Object} (optional) options
  @return {Event}
  @private
*/
function buildKeyboardEvent(type: string, options: EventOptions = {}): KeyboardEvent {
  let eventOpts = merge(merge({}, DEFAULT_EVENT_OPTIONS), options);
  let event, eventMethodName;

  try {
    event = new KeyboardEvent(type, eventOpts);

    // Property definitions are required for B/C for keyboard event usage
    // If this properties are not defined, when listening for key events
    // keyCode/which will be 0. Also, keyCode and which now are string
    // and if app compare it with === with integer key definitions,
    // there will be a fail.
    //
    // https://w3c.github.io/uievents/#interface-keyboardevent
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
    Object.defineProperty(event, 'keyCode', {
      get() {
        return parseInt(this.key);
      }
    });

    Object.defineProperty(event, 'which', {
      get() {
        return parseInt(this.key);
      }
    });

    return event;
  } catch(e) {
    // left intentionally blank
  }

  try {
    event = document.createEvent('KeyboardEvents');
    eventMethodName = 'initKeyboardEvent';
  } catch(e) {
    // left intentionally blank
  }

  if (!event) {
    try {
      event = document.createEvent('KeyEvents');
      eventMethodName = 'initKeyEvent';
    } catch(e) {
      // left intentionally blank
    }
  }

  if (event) {
    event[eventMethodName](
      type,
      eventOpts.bubbles,
      eventOpts.cancelable,
      window,
      eventOpts.ctrlKey,
      eventOpts.altKey,
      eventOpts.shiftKey,
      eventOpts.metaKey,
      eventOpts.keyCode,
      eventOpts.charCode
    );
  } else {
    event = buildBasicEvent(type, options);
  }

  return event;
}
