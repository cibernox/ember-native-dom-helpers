import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findWithAssert } from 'ember-native-dom-helpers';

moduleForComponent('find', 'Integration | Test Helper | findWithAssert', {
  integration: true
});

test('with empty query result, findWithAssert raises an error', function(assert) {
  this.render(hbs`
    <div class='hiding'>You can't find me</div>
  `);
  assert.throws(() => {
    findWithAssert('.hidden');
  });
});

test('with a query result, findWithAssert helper is the same as find helper', function(assert) {
  let selector = 'input[type="text"]';

  this.render(hbs`
    <input type="text" />
  `);
  let expected = document.querySelector(`#ember-testing ${selector}`);
  let actual = findWithAssert(selector);

  assert.strictEqual(actual, expected, 'input found within #ember-testing');
});
