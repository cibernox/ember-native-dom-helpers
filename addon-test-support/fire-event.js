import Ember from 'ember';

const { merge } = Ember;
const DEFAULT_EVENT_OPTIONS = { bubbles: true, cancelable: true };
const KEYBOARD_EVENT_TYPES = ['keydown', 'keypress', 'keyup'];
const MOUSE_EVENT_TYPES = ['click', 'mousedown', 'mouseup', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover'];

/*
  @method fireEvent
  @param {HTMLElement} element
  @param {String} type
  @param {Object} (optional) options
  @return {Event} The dispatched event
  @private
*/
export function fireEvent(element, type, options = {}) {
  if (!element) {
    return;
  }
  let event;
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

/*
  @method buildBasicEvent
  @param {String} type
  @param {Object} (optional) options
  @return {Event}
  @private
*/
function buildBasicEvent(type, options = {}) {
  let event = document.createEvent('Events');
  event.initEvent(type, true, true);
  merge(event, options);
  return event;
}

/*
  @method buildMouseEvent
  @param {String} type
  @param {Object} (optional) options
  @return {Event}
  @private
*/
function buildMouseEvent(type, options = {}) {
  let event;
  try {
    event = document.createEvent('MouseEvents');
    let eventOpts = merge(merge({}, DEFAULT_EVENT_OPTIONS), options);
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
  } catch (e) {
    event = buildBasicEvent(type, options);
  }
  return event;
}

/*
  @method buildKeyboardEvent
  @param {String} type
  @param {Object} (optional) options
  @return {Event}
  @private
*/
function buildKeyboardEvent(type, options = {}) {
  let eventOpts = merge(merge({}, DEFAULT_EVENT_OPTIONS), options);
  let event, eventMethodName;

  try {
    event = new KeyboardEvent(type, eventOpts);

    // Property definitions are required for B/C for keyboard event usage
    // If this properties are not defined, when listening for key events
    // keyCode/which will be 0. Also, keyCode and which now are string
    // and if app compare it with === with integer key definitions,
    // there will be a fail.
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
