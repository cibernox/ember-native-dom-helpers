import Ember from 'ember';

export default Ember.Route.extend({
  model({ id }) {
    return fetch(`/users/${id}`).then((r) => r.json()).then(({ data }) => data);
  }
});
