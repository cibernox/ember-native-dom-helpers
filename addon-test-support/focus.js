import Ember from 'ember';
import { fireEvent } from 'ember-native-dom-helpers/test-support/fire-event';
import wait from 'ember-test-helpers/wait';

const { run } = Ember;

export function focus(el) {
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
