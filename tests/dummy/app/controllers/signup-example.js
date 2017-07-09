import Ember from 'ember';
import fetch from 'fetch';

const { Controller, set, getProperties } = Ember;

export default Controller.extend({
  actions: {
    signup() {
      set(this, 'isSaving', true);
      let data = JSON.stringify(getProperties(this, 'email', 'password', 'passwordConfirmation'));
      return fetch('/signup', { method: 'POST', body: data }).then((r) => r.json())
        .then(({ data: { id } }) => {
          this.transitionToRoute('dashboard-example', id);
        }).finally(() => set(this, 'isSaving', false));
    }
  }
});
