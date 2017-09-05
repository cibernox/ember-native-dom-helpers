import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

moduleForComponent('findAll', 'Integration | Test Helper | findAll', {
  integration: true
});

test('with empty query result, findAll returns empty NodeList', function(assert) {
  this.render(hbs`
    <p class='hiding'>You can't find me</p>
    <p class='hiding'>I'm hidden as well</p>
  `);
  let expected = document.querySelectorAll('.hidden');
  let actual = findAll('.hidden');
  assert.ok(Array.isArray(actual), 'Array found');
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
  assert.ok(Array.isArray(actual), 'Array found');
  assert.strictEqual(actual[0], expected[0], 'one li:last-child element found within #ember-testing');
  assert.strictEqual(actual[1], expected[1], 'two li:last-child elements found within #ember-testing');
});

test('findAll helper can use (optional) element as the context to query', function(assert) {
  this.render(hbs`
    <div>
      <span>One</span>
      <span>Two</span>
      <span>Three</span>
    </div>
    <div class="second-set">
      <span>One</span>
      <span>Two</span>
      <span>Three</span>
    </div>
  `);

  let expected = document.querySelectorAll('#ember-testing .second-set span');
  let actual = findAll('span', document.querySelector('.second-set'));
  assert.equal(actual.length, expected.length);
});

test('findAll helper can use (optional) selector as the context to query', function(assert) {
  this.render(hbs`
    <div>
      <span>One</span>
      <span>Two</span>
      <span>Three</span>
    </div>
    <div class="second-set">
      <span>One</span>
      <span>Two</span>
      <span>Three</span>
    </div>
  `);

  let expected = document.querySelectorAll('#ember-testing .second-set span');
  let actual = findAll('span', document.querySelector('.second-set'));
  assert.equal(actual.length, expected.length);
});
