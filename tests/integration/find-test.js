import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('find', 'Integration | Test Helper | find', {
  integration: true
});

test('with empty query result, find returns null', function(assert) {
  this.render(hbs`
    <div class='hiding'>You can't find me</div>
  `);
  let expected = null;
  let actual = find('.hidden');
  assert.strictEqual(actual, expected, 'null is returned for an empty query');
});

test('find helper uses querySelector within test DOM', function(assert) {
  let selector = 'input[type="text"]';
  let firstInput = document.querySelector(selector);

  this.render(hbs`
    <input type="text" />
  `);
  let expected = document.querySelector(`#ember-testing ${selector}`);
  let actual = find(selector);

  assert.strictEqual(actual, expected, 'input found within #ember-testing');
  assert.notStrictEqual(actual, firstInput, 'test runner input not selected with find');
});

test('find returns only one element', function(assert) {
  this.render(hbs`
    <ul>
      <li>One</li>
      <li>Two</li>
    </ul>
  `);

  let expected = document.querySelector('#ember-testing li:last-child');
  let actual = find('li:last-child');
  assert.strictEqual(actual, expected, 'li:last-child element found within #ember-testing');
});

test('find helper can use (optional) element as the context to query', function(assert) {
  this.render(hbs`
    <select>
      <option value="">Choose one</option>
      <option value="0">Zero</option>
      <option value="1" selected="selected">One</option>
    </select>
  `);

  let expected = document.querySelector('#ember-testing select');
  let actual = find('select');
  assert.strictEqual(actual, expected, 'select found within #ember-testing');

  expected = document.querySelector('#ember-testing select option[selected]');
  actual = find('option[selected]', actual);
  assert.strictEqual(actual, expected, 'option found within select element');
});
