import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers/test-support/helpers';

moduleForComponent('find', 'Integration | Test Helper | findAll', {
  integration: true
});

test('with empty query result, findAll resturns empty NodeList', function(assert) {
  this.render(hbs`
    <p class='hiding'>You can't find me</p>
    <p class='hiding'>I'm hidden as well</p>
  `);
  let expected = document.querySelectorAll('.hidden');
  let actual = findAll('.hidden');
  assert.ok(actual instanceof NodeList, 'NodeList instance found');
  assert.strictEqual(actual.length, expected.length, 'empty NodeList returned for an empty query');
});

test('findAll helper uses querySelectorAll within test DOM', function(assert) {
  let selector = 'input[type="text"]';
  let firstInput = document.querySelector(selector);

  this.render(hbs`
    <input type="text" />
  `);
  let expected = document.querySelectorAll(`#ember-testing ${selector}`);
  let actual = findAll(selector);

  assert.strictEqual(actual[0], expected[0], 'input found within #ember-testing');
  assert.notStrictEqual(actual[0], firstInput, 'test runner input not selected with find');
});

test('findAll returns the resulting node list', function(assert) {
  this.render(hbs`
    <ul>
      <li>One</li>
      <li>Two</li>
    </ul>
    <ol>
      <li>A</li>
      <li>B</li>
    </ol>
  `);

  let expected = document.querySelectorAll('#ember-testing li:last-child');
  let actual = findAll('li:last-child');
  assert.ok(actual instanceof NodeList, 'NodeList instance found');
  assert.strictEqual(actual[0], expected[0], 'one li:last-child element found within #ember-testing');
  assert.strictEqual(actual[1], expected[1], 'two li:last-child elements found within #ember-testing');
});

test('findAll helper can use (optional) element as the context to query', function(assert) {
  this.render(hbs`
    <select>
      <option value="">Choose one</option>
      <option value="0">Zero</option>
      <option value="1" selected="selected">One</option>
    </select>
  `);

  let expected = document.querySelectorAll('#ember-testing select option');
  let actual = findAll('option', document.querySelector('select'));
  assert.equal(actual.length, expected.length, 'select options found within #ember-testing');
});
