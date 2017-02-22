import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

const { run, merge } = Ember;

const DEFAULT_EVENT_OPTIONS = { canBubble: true, cancelable: true };
const KEYBOARD_EVENT_TYPES = ['keydown', 'keypress', 'keyup'];
const MOUSE_EVENT_TYPES = ['click', 'mousedown', 'mouseup', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover'];

function focus(el) {
  if (!el) { return; }

  if (el.tagName === 'INPUT' || el.contentEditable || el.tagName === 'ANCHOR') {
    let type = el.type;
    if (type !== 'checkbox' && type !== 'radio' && type !== 'hidden') {
      run(null, function() {
        // Firefox does not trigger the `focusin` event if the window
        // does not have focus. If the document does not have focus then
        // fire `focusin` event as well.
        if (document.hasFocus && !document.hasFocus()) {
          fireEvent(el, 'focusin');
          fireEvent(el, 'focus', null, false); // focus does not bubble
        } else {
          el.focus();
        }
      });
    }
  }
  return wait();
}

function fireEvent(element, type, options = {}) {
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
}

function buildBasicEvent(type, options = {}, bubbles = true, cancelable = true) {
  let event = document.createEvent('Events');
  event.initEvent(type, bubbles, cancelable);
  merge(event, options);
  return event;
}

function buildMouseEvent(type, options = {}) {
  let event;
  try {
    event = document.createEvent('MouseEvents');
    let eventOpts = merge(merge({}, DEFAULT_EVENT_OPTIONS), options);
    event.initMouseEvent(
      type,
      eventOpts.canBubble,
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

function buildKeyboardEvent(type, options = {}) {
  let event;
  try {
    event = document.createEvent('KeyEvents');
    let eventOpts = merge(merge({}, DEFAULT_EVENT_OPTIONS), options);
    event.initKeyEvent(
      type,
      eventOpts.canBubble,
      eventOpts.cancelable,
      window,
      eventOpts.ctrlKey,
      eventOpts.altKey,
      eventOpts.shiftKey,
      eventOpts.metaKey,
      eventOpts.keyCode,
      eventOpts.charCode
    );
  } catch (e) {
    event = buildBasicEvent(type, options);
  }
  return event;
}

export function click(selector, options = {}) {
  let el = document.querySelector(selector);
  run(() => fireEvent(el, 'mousedown', options));
  focus(el);
  run(() => fireEvent(el, 'mouseup', options));
  run(() => fireEvent(el, 'click', options));
  return wait();
}

export function fillIn(selector, text) {
  let el = document.querySelector(selector);
  run(() => focus(el));
  run(() => el.value = text);
  run(() => fireEvent(el, 'input'));
  run(() => fireEvent(el, 'change'));
  return wait();
}

export function triggerEvent(selector, type, options) {
  let el = document.querySelector(selector);
  run(() => fireEvent(el, type, options));
  return wait();
}

export function keyEvent(selector, type, keyCode) {
  return triggerEvent(selector, type, { keyCode, which: keyCode });
}
