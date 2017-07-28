import Route from '@ember/routing/route';
import fetch from 'fetch';

export default Route.extend({
  model({ id }) {
    return fetch(`/users/${id}`).then((r) => r.json()).then(({ data }) => data);
  }
});
