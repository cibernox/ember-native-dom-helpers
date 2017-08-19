import { merge } from '@ember/polyfills';
const DEFAULT_EVENT_OPTIONS = { bubbles: true, cancelable: true };
const KEYBOARD_EVENT_TYPES = ['keydown', 'keypress', 'keyup'];
const MOUSE_EVENT_TYPES = ['click', 'mousedown', 'mouseup', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover'];
const FILE_SELECTION_EVENT_TYPES = ['change'];

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
    let rect;
    if (element instanceof Window) {
      rect = element.document.documentElement.getBoundingClientRect();
    } else if (element instanceof Document) {
      rect = element.documentElement.getBoundingClientRect();
    } else if (element instanceof HTMLElement || element instanceof SVGElement) {
      rect = element.getBoundingClientRect();
    } else {
      return;
    }
    let x = rect.left + 1;
    let y = rect.top + 1;
    let simulatedCoordinates = {
      screenX: x + 5,   // Those numbers don't really mean anything.
      screenY: y + 95,  // They're just to make the screenX/Y be different of clientX/Y..
      clientX: x,
      clientY: y
    };
    event = buildMouseEvent(type, merge(simulatedCoordinates, options));
  } else if (FILE_SELECTION_EVENT_TYPES.indexOf(type) > -1 && element.files) {
    event = buildFileEvent(type, element, options);
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

  let bubbles = options.bubbles !== undefined ? options.bubbles : true;
  let cancelable = options.cancelable !== undefined ? options.cancelable : true;

  delete options.bubbles;
  delete options.cancelable;

  // bubbles and cancelable are readonly, so they can be
  // set when initializing event
  event.initEvent(type, bubbles, cancelable);
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
  } catch(e) {
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

/*
  @method buildFileEvent
  @param {String} type
  @param {Array} array of flies
  @param {HTMLElement} element
  @return {Event}
  @private
*/
function buildFileEvent(type, element, files = []) {
  let event = buildBasicEvent(type);

  if (files.length > 0) {
    Object.defineProperty(files, 'item', {
      value(index) {
        return typeof index === 'number' ? this[index] : null;
      }
    });
    Object.defineProperty(element, 'files', {
      value: files
    });
  }

  Object.defineProperty(event, 'target', {
    value: element
  });

  return event;
}
