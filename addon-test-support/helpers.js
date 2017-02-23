import Ember from 'ember';
import wait from 'ember-test-helpers/wait';
import settings from 'ember-native-dom-helpers/test-support/settings';

const { run, merge } = Ember;
const DEFAULT_EVENT_OPTIONS = { canBubble: true, cancelable: true };
const KEYBOARD_EVENT_TYPES = ['keydown', 'keypress', 'keyup'];
const MOUSE_EVENT_TYPES = ['click', 'mousedown', 'mouseup', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover'];


function focus(el) {
  if (!el) { return; }

  if (el.tagName === 'INPUT' || el.contentEditable || el.tagName === 'A') {
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

/*
  @method click
  @param {String} selector
  @param {Object} options
  @return {RSVP.Promise}
  @public
*/
export function click(selector, options = {}) {
  let el = first(selector);
  run(() => fireEvent(el, 'mousedown', options));
  focus(el);
  run(() => fireEvent(el, 'mouseup', options));
  run(() => fireEvent(el, 'click', options));
  return wait();
}

/*
  @method fillIn
  @param {String} selector
  @param {String} text
  @return {RSVP.Promise}
  @public
*/
export function fillIn(selector, text) {
  let el = first(selector);
  run(() => focus(el));
  run(() => el.value = text);
  run(() => fireEvent(el, 'input'));
  run(() => fireEvent(el, 'change'));
  return wait();
}

/*
  @method triggerEvent
  @param {String} selector
  @param {String} type
  @param {Object} options
  @return {RSVP.Promise}
  @public
*/
export function triggerEvent(selector, type, options) {
  let el = first(selector);
  run(() => fireEvent(el, type, options));
  return wait();
}

/*
  @method keyEvent
  @param {String} selector
  @param {String} type
  @param {Number} keyCode
*/
export function keyEvent(selector, type, keyCode) {
  return triggerEvent(selector, type, { keyCode, which: keyCode });
}

/*
  The find test helper uses `querySelectorAll` to search inside the test
  DOM (based on app configuration for the rootElement).

  Alternalively, a second argument may be passed which is an element as the
  DOM context to search within.

  @method find
  @param {String|HTMLElement|NodeList} CSS selector to find one or more elements in the test DOM
  @param {HTMLElement} contextEl to query within, query from its contained DOM
  @return {HTMLElement|NodeList} one element or a (non-live) list of element objects
  @public
*/
export function find(selector, contextEl) {
  let result;
  if (selector instanceof HTMLElement || selector instanceof NodeList) {
    result = selector;
  } else if (contextEl instanceof HTMLElement) {
    result = contextEl.querySelectorAll(selector);
  } else if (Object.prototype.toString.call(selector) === "[object String]") {
    result = document.querySelectorAll(`${settings.rootElement} ${selector}`);
  }
  return (result.length === 1) ? result[0] : result;
}


/*
  Since the find helper may return a NodeList or an HTMLElement the first helper
  only returns the first matching element

  @method first
  @param {String} CSS selector to find one element in the test DOM
  @param {HTMLElement} contextEl to query within, query from its contained DOM
  @return {HTMLElement} first element found with matching selector
  @public
*/
export function first(selector, contextEl) {
  const el = find(selector, contextEl);
  return (el instanceof NodeList) ? el[0] : el;
}
