import Controller from '@ember/controller';
import { getProperties, set } from '@ember/object';
import fetch from 'fetch';

export default Ember.Controller.extend({
  avatarFileName: null,
  
  actions: {
    onFileSelected(event) {
      let files = event.target.files;
      this.set('avatarFileName', files[0].name);
    },
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
