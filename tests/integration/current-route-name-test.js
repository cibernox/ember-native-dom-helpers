import { moduleForComponent, test } from 'ember-qunit';
import { currentRouteName } from 'ember-native-dom-helpers';

moduleForComponent('currentRouteName', 'Integration | Test Helper | currentRouteName', {
  integration: true
});

test('It raises an error in integration', function(assert) {
  assert.throws(function() {
    currentRouteName();
  }, 'currentRouteName is only available during acceptance tests');
});
