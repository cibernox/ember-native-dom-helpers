import Ember from 'ember';
import fetch from 'fetch';

export default Ember.Controller.extend({
  actions: {
    signup() {
      this.set('isSaving', true);
      let data = JSON.stringify(this.getProperties('email', 'password', 'passwordConfirmation'));
      return fetch('/signup', { method: 'POST', body: data }).then((r) => r.json())
        .then(({ data: { id } }) => {
          this.transitionToRoute('dashboard-example', id);
        }).finally(() => this.set('isSaving', false));
    }
  }
});
