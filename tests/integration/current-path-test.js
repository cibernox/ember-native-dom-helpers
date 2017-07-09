import { moduleForComponent, test } from 'ember-qunit';
import { currentPath } from 'ember-native-dom-helpers';

moduleForComponent('currentPath', 'Integration | Test Helper | currentPath', {
  integration: true
});

test('It raises an error in integration', function(assert) {
  assert.throws(() => {
    currentPath();
  }, 'currentPath is only available during acceptance tests');
});
