import Ember from 'ember';
import Mirage from 'ember-cli-mirage';

const { isBlank } = Ember;

export default function() {
  this.timing = 800;

  this.get('/users/:id');
  this.post('/signup', function(schema, req) {
    let { email, password, passwordConfirmation } = JSON.parse(req.requestBody);
    if (isBlank(email) || isBlank(password) || password !== passwordConfirmation) {
      return new Mirage.Response(422, {}, { errors: ['very bad data'] });
    }
    return schema.users.create({ email });
  });
}
