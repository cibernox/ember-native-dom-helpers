import { run } from '@ember/runloop';
import getElementWithAssert from './-private/get-element-with-assert';
import isFocusable from './-private/is-focusable';
import { fireEvent } from './fire-event';
import wait from 'ember-test-helpers/wait';

/*
  @method blur
  @param {String|HTMLElement} selector
  @return {RSVP.Promise}
  @public
*/
export function blur(selector) {
  if (!selector) { return; }

  let el = getElementWithAssert(selector);

  if (isFocusable(el)) {
    run(null, function() {
      let browserIsNotFocused = document.hasFocus && !document.hasFocus();

      // makes `document.activeElement` be `body`.
      // If the browser is focused, it also fires a blur event
      el.blur();

      // Chrome/Firefox does not trigger the `blur` event if the window
      // does not have focus. If the document does not have focus then
      // fire `blur` event via native event.
      if (browserIsNotFocused) {
        fireEvent(el, 'blur', { bubbles: false });
      }
    });
  }

  return (window.wait || wait)();
}
