import wait from 'ember-test-helpers/wait';

export function flushScrollAndWait() {
  return wait().then(() => {
    return new Ember.RSVP.Promise((resolve) => {
      window.requestAnimationFrame(resolve);
    });
  });
};
