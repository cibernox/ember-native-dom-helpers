import { run } from '@ember/runloop';
import getElementWithAssert from './-private/get-element-with-assert';
import { focus } from './focus';
import { fireEvent } from './fire-event';
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
  run(() => fireEvent(el, 'keydown', {key: BACKSPACE_CODE}));
  run(() => el.value = '');
  run(() => fireEvent(el, 'keyup', {key: BACKSPACE_CODE}));
  run(() => fireEvent(el, 'input'));
  run(() => fireEvent(el, 'change'));

  let splittedValue = text.toString().split('');

  splittedValue.forEach(character => {
    run(() => fireEvent(el, 'keydown', {key: character.codePointAt(0)}));
    run(() => el.value = el.value + character);
    run(() => fireEvent(el, 'keyup', {key: character.codePointAt(0)}));
  });

  run(() => fireEvent(el, 'input'));
  run(() => fireEvent(el, 'change'));
  return (window.wait || wait)();
}
