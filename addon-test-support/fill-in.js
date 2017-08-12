import { run } from '@ember/runloop';
import getElementWithAssert from './-private/get-element-with-assert';
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
  run(() => focus(el));
  run(() => el.value = text);
  run(() => fireEvent(el, 'input'));
  run(() => fireEvent(el, 'change'));
  return (window.wait || wait)();
}
