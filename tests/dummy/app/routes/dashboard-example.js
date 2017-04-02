import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Route.extend({
  model({ id }) {
    return fetch(`/users/${id}`).then((r) => r.json()).then(({ data }) => data);
  }
});
