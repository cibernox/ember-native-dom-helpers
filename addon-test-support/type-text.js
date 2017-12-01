import { run } from '@ember/runloop';
import getElementWithAssert from './-private/get-element-with-assert';
import { focus } from './focus';
import { fireEvent } from './fire-event';
import { keyEvent } from './key-event';
import wait from 'ember-test-helpers/wait';

const BACKSPACE_CODE = 8;
/*
  @method typeText
  @param {String|HTMLElement} selector
  @param {String} text
  @return {RSVP.Promise}
  @public
*/
export function typeText(selector, text) {
  let el = getElementWithAssert(selector);

  run(() => focus(el));
  keyEvent(el, 'keydown', BACKSPACE_CODE);
  run(() => el.value = '');
  keyEvent(el, 'input');
  keyEvent(el, 'keyup', BACKSPACE_CODE);

  let splittedValue = text.toString().split('');

  splittedValue.forEach((character) => {
    keyEvent(el, 'keydown',  character.codePointAt(0));
    run(() => el.value = el.value + character);
    keyEvent(el, 'input');
    keyEvent(el, 'keyup',  character.codePointAt(0));
  });

  run(() => fireEvent(el, 'change'));
  return (window.wait || wait)();
}
