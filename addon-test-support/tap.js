import { run } from '@ember/runloop';
import getElementWithAssert from './-private/get-element-with-assert';
import { fireEvent } from './fire-event';
import { clickEventSequence } from './click';
import wait from 'ember-test-helpers/wait';

/*
  @method tap
  @param {String|HTMLElement} selector
  @param {Object} options
  @return {RSVP.Promise}
  @public
*/
export function tap(selector, options = {}) {
  let el = getElementWithAssert(selector);
  let touchstartEv, touchendEv;
  run(() => touchstartEv = fireEvent(el, 'touchstart', options));
  run(() => touchendEv = fireEvent(el, 'touchend', options));
  if (!touchstartEv.defaultPrevented && !touchendEv.defaultPrevented) {
    clickEventSequence(el);
  }
  return (window.wait || wait)();
}
