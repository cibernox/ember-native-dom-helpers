import { run } from '@ember/runloop';
import getElementWithAssert from './-private/get-element-with-assert';
import isFocusable from './-private/is-focusable';
import { fireEvent } from './fire-event';
import wait from 'ember-test-helpers/wait';

/*
  @method focus
  @param {String|HTMLElement} selector
  @return {RSVP.Promise}
  @public
*/
export function focus(selector) {
  if (!selector) { return; }

  let el = getElementWithAssert(selector);

  if (isFocusable(el)) {
    run(null, function() {
      let browserIsNotFocused = document.hasFocus && !document.hasFocus();

      // Firefox does not trigger the `focusin` event if the window
      // does not have focus. If the document does not have focus then
      // fire `focusin` event as well.
      if (browserIsNotFocused) {
        fireEvent(el, 'focusin', {
          bubbles: false
        });
      }

      // makes `document.activeElement` be `el`. If the browser is focused, it also fires a focus event
      el.focus();

      // if the browser is not focused the previous `el.focus()` didn't fire an event, so we simulate it
      if (browserIsNotFocused) {
        fireEvent(el, 'focus', {
          bubbles: false
        });
      }
    });
  }

  return (window.wait || wait)();
}
