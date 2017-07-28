import { run } from '@ember/runloop';
import getElementWithAssert from './-private/get-element-with-assert';
import { fireEvent } from './fire-event';
import wait from 'ember-test-helpers/wait';

/*
  @method triggerEvent
  @param {String|HTMLElement} selector
  @param {String} type
  @param {Object} options
  @return {RSVP.Promise}
  @public
*/
export function triggerEvent(selector, type, options) {
  let el = getElementWithAssert(selector);
  run(() => fireEvent(el, type, options));
  return (window.wait || wait)();
}
