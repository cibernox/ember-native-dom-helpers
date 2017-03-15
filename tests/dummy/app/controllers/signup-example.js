import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  actions: {
    signup() {
      this.set('isSaving', true);
      this.get('ajax').request('/signup', {
        method: 'POST',
        data: JSON.stringify(this.getProperties('email', 'password', 'passwordConfirmation'))
      }).then(({ data: { id } }) => {
        this.transitionToRoute('dashboard-example', id);
      }).finally(() => {
        this.set('isSaving', false);
      });
    }
  }
});
