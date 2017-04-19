import wait from 'ember-test-helpers/wait';

/*
  Triggers a paint (and therefore flushes any queued up scroll events).
  
  @method flushScrollAndWait
  @return {RSVP.Promise}
  @public
*/
export function flushScrollAndWait() {
  return wait().then(() => {
    return new Ember.RSVP.Promise((resolve) => {
      window.requestAnimationFrame(resolve);
    });
  });
}
