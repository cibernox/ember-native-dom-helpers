import Ember from 'ember';
import fetch from 'fetch';

export default Ember.Controller.extend({
  avatarFileName: null,

  actions: {
    onFileSelected(event) {
      let files = event.target.files;
      this.set('avatarFileName', files[0].name);
    },
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
