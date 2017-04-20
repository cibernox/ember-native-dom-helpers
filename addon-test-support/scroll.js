import getElementWithAssert from './-private/get-element-with-assert';
import wait from 'ember-test-helpers/wait';


/*
  Triggers a paint (and therefore flushes any queued up scroll events).

  @method triggerFlushWithPromise
  @return {RSVP.Promise}
  @private
*/
function triggerFlushWithPromise(){
  return wait().then(() => {
    return new Ember.RSVP.Promise((resolve) => {
      window.requestAnimationFrame(resolve);
    });
  });
}

/*
  Scrolls DOM element or selector to the given position (if the DOM element is currently overflowed).
  The promise resolves after the scroll event has been triggered.
  @method scrollLeft
  @param {String|HTMLElement} selector
  @param {Number} position
  @return {RSVP.Promise}
  @public
*/
export function scrollLeft(selector, position) {
  getElementWithAssert(selector).scrollLeft = position;
  return triggerFlushWithPromise();
}

/*
  Scrolls DOM element or selector to the given position (if the DOM element is currently overflowed).
  The promise resolves after the scroll event has been triggered.

  @method scrollTop
  @param {String|HTMLElement} selector
  @param {Number} position
  @return {RSVP.Promise}
  @public
*/
export function scrollTop(selector, position) {
  getElementWithAssert(selector).scrollTop = position;
  return triggerFlushWithPromise();
}
