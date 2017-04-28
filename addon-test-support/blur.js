import Ember from 'ember';
import getElementWithAssert from './-private/get-element-with-assert';
import { fireEvent } from './fire-event';
import wait from 'ember-test-helpers/wait';

const { run } = Ember;

/*
  @method blur
  @param {String|HTMLElement} selector
  @return {RSVP.Promise}
  @public
*/
export function blur(selector) {
  if (!selector) { return; }
  let el = getElementWithAssert(selector);

  if (el.tagName === 'INPUT' || el.contentEditable || el.tagName === 'A') {
    let { type } = el;
    if (type !== 'checkbox' && type !== 'radio' && type !== 'hidden') {
      run(null, function() {
        // Chrome/Firefox does not trigger the `blur` event if the window
        // does not have focus. If the document does not have focus then
        // fire `blur` event via native event.
        if (document.hasFocus && !document.hasFocus()) {
          fireEvent(el, 'blur', null, false); // blur does not bubble
        } else {
          el.blur();
        }
      });
    }
  }
  return (window.wait || wait)();
}
