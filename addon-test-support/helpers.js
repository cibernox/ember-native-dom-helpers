import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

const { run, $ } = Ember;

// integration helpers
function focus(el) {
  if (!el) { return; }
  let $el = $(el);
  if ($el.is(':input, [contenteditable=true]')) {
    let type = $el.prop('type');
    if (type !== 'checkbox' && type !== 'radio' && type !== 'hidden') {
      run(null, function() {
        // Firefox does not trigger the `focusin` event if the window
        // does not have focus. If the document doesn't have focus just
        // use trigger('focusin') instead.

        if (!document.hasFocus || document.hasFocus()) {
          el.focus();
        } else {
          $el.trigger('focusin');
        }
      });
    }
  }

  return wait();
}

export function click(selector, options = {}) {
  let mousedown = new window.Event('mousedown', { bubbles: true, cancelable: true, view: window });
  let mouseup = new window.Event('mouseup', { bubbles: true, cancelable: true, view: window });
  let click = new window.Event('click', { bubbles: true, cancelable: true, view: window });
  Object.keys(options).forEach(key => {
    mousedown[key] = options[key];
    mouseup[key] = options[key];
    click[key] = options[key];
  });
  let element = document.querySelector(selector);
  run(() => element.dispatchEvent(mousedown));
  focus(element);
  run(() => element.dispatchEvent(mouseup));
  run(() => element.dispatchEvent(click));

  return wait();
}
