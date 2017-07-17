import Ember from 'ember';
import fetch from 'fetch';

const { Route } = Ember;

export default Route.extend({
  model({ id }) {
    return fetch(`/users/${id}`).then((r) => r.json()).then(({ data }) => data);
  }
});
