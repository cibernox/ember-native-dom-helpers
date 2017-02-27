import Ember from 'ember';
import { findWithAssert } from 'ember-native-dom-helpers/test-support/find-with-assert';
import { focus } from 'ember-native-dom-helpers/test-support/focus';
import { fireEvent } from 'ember-native-dom-helpers/test-support/fire-event';
import wait from 'ember-test-helpers/wait';

const { run } = Ember;

/*
  @method fillIn
  @param {String} selector
  @param {String} text
  @return {RSVP.Promise}
  @public
*/
export function fillIn(selector, text) {
  let el = findWithAssert(selector);
  run(() => focus(el));
  run(() => el.value = text);
  run(() => fireEvent(el, 'input'));
  run(() => fireEvent(el, 'change'));
  return wait();
}
