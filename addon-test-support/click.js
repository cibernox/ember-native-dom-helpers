import { run } from '@ember/runloop';
import getElementWithAssert from './-private/get-element-with-assert';
import { fireEvent } from './fire-event';
import { focus } from './focus';
import wait from 'ember-test-helpers/wait';

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
  @param {HTMLElement} context
  @param {Object} options
  @return {RSVP.Promise}
  @public
*/
export function click(selector, context, options) {
  let element;
  if (context instanceof HTMLElement) {
    element = getElementWithAssert(selector, context);
  } else {
    options = context || {};
    element = getElementWithAssert(selector);
  }
  clickEventSequence(element, options);
  return (window.wait || wait)();
}
