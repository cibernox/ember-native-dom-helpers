import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  model({ id }) {
    return this.get('ajax').request(`/users/${id}`).then(({ data }) => data);
  }
});
