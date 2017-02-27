import Ember from 'ember';
import { findWithAssert } from './find-with-assert';
import { fireEvent } from './fire-event';
import wait from 'ember-test-helpers/wait';

const { run } = Ember;

/*
  @method triggerEvent
  @param {String} selector
  @param {String} type
  @param {Object} options
  @return {RSVP.Promise}
  @public
*/
export function triggerEvent(selector, type, options) {
  let element = findWithAssert(selector);
  run(() => fireEvent(element, type, options));
  return wait();
}
