import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, first } from 'ember-native-dom-helpers/test-support/helpers';
import settings from 'ember-native-dom-helpers/test-support/settings';
import Ember from 'ember';


moduleForComponent('find', 'Integration | Test Helper | find', {
  integration: true
});

test('find helper uses querySelectorAll within test DOM', function(assert) {
  const selector = 'input[type="text"]';
  const firstInput = document.querySelectorAll(selector)[0];

  this.render(hbs`
    <input type="text" />
  `);
  let expected = document.querySelectorAll(`#ember-testing ${selector}`)[0];
  let actual = find(selector);

  assert.strictEqual(actual, expected, 'input found within #ember-testing');
  assert.notStrictEqual(actual, firstInput, 'test runner input not selected with find');
});

test('find helper can find using an element as the context to query', function(assert) {
  this.render(hbs`
    <select>
      <option value="">Choose one</option>
      <option value="0">Zero</option>
      <option value="1" selected="selected">One</option>
    </select>
  `);

  let expected = document.querySelectorAll('#ember-testing select')[0];
  let actual = find('select');
  assert.strictEqual(actual, expected, 'select found within #ember-testing');

  expected = document.querySelectorAll('#ember-testing select option[selected]')[0];
  actual = find('option[selected]', actual); 
  assert.strictEqual(actual, expected, 'option found within select element');
});

test('find returns only one element when the resulting node list has one item', function(assert) {
  this.render(hbs`
    <ul>
      <li>One</li>
      <li>Two</li>
    </ul>
  `);

  let expected = document.querySelectorAll('#ember-testing li:last-child')[0];
  let actual = find('li:last-child');
  assert.strictEqual(actual, expected, 'li:last-child element found within #ember-testing');
});

test('find returns the resulting node list if selector matches more than one item', function(assert) {
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

  let expected = [
    document.querySelectorAll('#ember-testing ul li:last-child')[0],
    document.querySelectorAll('#ember-testing ol li:last-child')[0]
  ];
  let actual = find('li:last-child');
  assert.strictEqual(actual[0], expected[0], 'one li:last-child element found within #ember-testing');
  assert.strictEqual(actual[1], expected[1], 'two li:last-child elements found within #ember-testing');
});

test('first helper is like find but returns only an element', function(assert) {
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

  let expected = document.querySelectorAll('#ember-testing li:last-child')[0];
  let actual = first('li:last-child');
  assert.strictEqual(actual, expected, 'li element found within #ember-testing');
});

test('if an element is passed to find instead of a selector it is returned', function(assert) {
  this.render(hbs`
    <a href="https://emberjs.com">Ember</a>
  `);
  let expected = document.querySelector('#ember-testing a');
  let actual = find(expected);
  assert.strictEqual(actual, expected, 'element was returned from find');
});

test('if a node list is passed to find instead of a selector it is returned', function(assert) {
  this.render(hbs`
    <a href="https://emberjs.com">Ember</a>
    <a href="https://ember-cli.com">Ember CLI</a>
  `);
  let expected = document.querySelector('#ember-testing a');
  let actual = find(expected);
  assert.strictEqual(actual, expected, 'node list was returned from find');
});

test('with setting for using jquery with the find helper', function(assert) {
  // Can be used for test suites that have lots of jquery usage
  settings.useJQueryWrapper = true;

  this.render(hbs`
    <a href="https://emberjs.com">Ember</a>
    <a href="https://ember-cli.com">Ember CLI</a>
  `);

  let expected = Ember.$('#ember-testing a').first();
  let actual = find('a').first();
  assert.strictEqual(actual[0], expected[0], 'anchor elment found');
  assert.ok(actual.jquery, 'element is a jquery instance');

  actual = first('a');
  assert.strictEqual(actual[0], expected[0], 'first anchor elment found');
  assert.ok(actual.jquery, 'first element is a jquery instance');

  settings.useJQueryWrapper = false;
});
