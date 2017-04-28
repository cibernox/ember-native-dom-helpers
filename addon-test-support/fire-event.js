import Ember from 'ember';

const { merge } = Ember;
const DEFAULT_EVENT_OPTIONS = { canBubble: true, cancelable: true };
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

/*
  @method buildKeyboardEvent
  @param {String} type
  @param {Object} (optional) options
  @return {Event}
  @private
*/
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
