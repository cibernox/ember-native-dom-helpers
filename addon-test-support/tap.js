import Ember from 'ember';
import { findWithAssert } from './find-with-assert';
import { fireEvent } from './fire-event';
import { clickEventSequence } from './click';
import wait from 'ember-test-helpers/wait';

const { run } = Ember;

/*
  @method tap
  @param {String} selector
  @param {Object} options
  @return {RSVP.Promise}
  @public
*/
export function tap(selector, options = {}) {
  let el = findWithAssert(selector);
  let touchstartEv;
  let touchendEv;
  run(() => touchstartEv = fireEvent(el, 'touchstart', options));
  run(() => touchendEv = fireEvent(el, 'touchend', options));
  if (!touchstartEv.defaultPrevented && !touchendEv.defaultPrevented) {
    clickEventSequence(el);
  }
  return wait();
}
