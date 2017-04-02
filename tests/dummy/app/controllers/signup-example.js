import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Controller.extend({
  actions: {
    signup() {
      this.set('isSaving', true);
      let promise = fetch('/signup', {
        method: 'POST',
        data: JSON.stringify(this.getProperties('email', 'password', 'passwordConfirmation'))
      }).then((r) => r.json()).then(({ data: { id } }) => {
        this.transitionToRoute('dashboard-example', id);
      });
      RSVP.resolve(promise).finally(() => this.set('isSaving', false));
    }
  }
});
