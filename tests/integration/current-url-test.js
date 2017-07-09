import { moduleForComponent, test } from 'ember-qunit';
import { currentURL } from 'ember-native-dom-helpers';

moduleForComponent('currentURL', 'Integration | Test Helper | currentURL', {
  integration: true
});

test('It raises an error in integration', function(assert) {
  assert.throws(function() {
    currentURL();
  }, 'currentURL is only available during acceptance tests');
});
