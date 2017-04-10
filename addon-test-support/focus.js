import Ember from 'ember';
import getElementWithAssert from './-private/get-element-with-assert';
import { fireEvent } from './fire-event';
import wait from 'ember-test-helpers/wait';

const { run } = Ember;

/*
  @method focus
  @param {String|HTMLElement} selector
  @return {RSVP.Promise}
  @public
*/
export function focus(selector) {
  if (!selector) { return; }
  let el = getElementWithAssert(selector);

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
  return (window.wait || wait)();
}
