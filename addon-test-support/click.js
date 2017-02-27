import Ember from 'ember';
import { findWithAssert } from './find-with-assert';
import { fireEvent } from './fire-event';
import { focus } from './focus';
import wait from 'ember-test-helpers/wait';

const { run } = Ember;


/*
  @method click
  @param {String} selector
  @param {Object} options
  @return {RSVP.Promise}
  @public
*/
export function click(selector, options = {}) {
  let el = findWithAssert(selector);
  run(() => fireEvent(el, 'mousedown', options));
  focus(el);
  run(() => fireEvent(el, 'mouseup', options));
  run(() => fireEvent(el, 'click', options));
  return wait();
}
