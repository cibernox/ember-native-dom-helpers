import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findWithAssert } from 'ember-native-dom-helpers/test-support/helpers';


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

/*
test('find helper uses querySelector within test DOM', function(assert) {
  const selector = 'input[type="text"]';
  const firstInput = document.querySelector(selector);

  this.render(hbs`
    <input type="text" />
  `);
  let expected = document.querySelector(`#ember-testing ${selector}`);
  let actual = find(selector);

  assert.strictEqual(actual, expected, 'input found within #ember-testing');
  assert.notStrictEqual(actual, firstInput, 'test runner input not selected with find');
});
*/
