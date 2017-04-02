import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Controller.extend({
  actions: {
    signup() {
      this.set('isSaving', true);
      let data = JSON.stringify(this.getProperties('email', 'password', 'passwordConfirmation'));
      debugger;
      return fetch('/signup', { method: 'POST', data }).then((r) => r.json())
      .then(({ data: { id } }) => {
        this.transitionToRoute('dashboard-example', id);
      }).finally(() => this.set('isSaving', false));
    }
  }
});
