import Ember from 'ember';
import getElementWithAssert from './-private/get-element-with-assert';
import { fireEvent } from './fire-event';
import { focus } from './focus';
import wait from 'ember-test-helpers/wait';

const { run } = Ember;

/*
  @method clickEventSequence
  @private
*/
export function clickEventSequence(el, options) {
  run(() => fireEvent(el, 'mousedown', options));
  focus(el);
  run(() => fireEvent(el, 'mouseup', options));
  run(() => fireEvent(el, 'click', options));
}

/*
  @method click
  @param {String|HTMLElement} selector
  @param {Object} options
  @return {RSVP.Promise}
  @public
*/
export function click(selector, options = {}) {
  clickEventSequence(getElementWithAssert(selector), options);
  return (window.wait || wait)();
}
