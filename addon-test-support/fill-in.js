import { run } from '@ember/runloop';
import getElementWithAssert from './-private/get-element-with-assert';
import isFormControl from './-private/is-form-control';
import isContentEditable from './-private/is-content-editable';
import { focus } from './focus';
import { fireEvent } from './fire-event';
import wait from 'ember-test-helpers/wait';

/*
  @method fillIn
  @param {String|HTMLElement} selector
  @param {String} text
  @return {RSVP.Promise}
  @public
*/
export function fillIn(selector, text) {
  let el = getElementWithAssert(selector);

  if (!isFormControl(el) && !isContentEditable(el)) {
    throw new Error('Unable to fill element');
  }

  run(() => focus(el));
  run(() => {
    if (isContentEditable(el)) {
      el.innerHTML = text;
    } else {
      el.value = text;
    }
  });
  run(() => fireEvent(el, 'input'));
  run(() => fireEvent(el, 'change'));
  return (window.wait || wait)();
}
