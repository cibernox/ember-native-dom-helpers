import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, first, fillIn, click, keyEvent, triggerEvent } from 'ember-native-dom-helpers/test-support/helpers';

moduleForComponent('x-form', 'Integration | Component | x-form', {
  integration: true
});

test('form inputs exist', function(assert) {
  this.render(hbs`{{x-form}}`);

  assert.equal(this.$('input[type="text"]').length, 1);
  assert.equal(this.$('input[type="checkbox"]').length, 1);
  assert.equal(this.$('button[type="submit"]').length, 1);
  assert.equal(this.$('textarea').length, 1);
  assert.equal(this.$('a.terms-show').length, 1);
  assert.equal(this.$('button.terms-agree').length, 1);
});

test('can fill in a text input field', function(assert) {
  this.render(hbs`{{x-form}}`);

  let text = 'yada yada';
  let selector = 'input[type="text"]';

  let value = find(selector).value;
  assert.equal(value, '', 'nothing input yet');
  fillIn(selector, text);

  value = find(selector).value;
  assert.equal(value, text, `expected ${value} to be ${text}`);
});

test('can fill in a textarea field', function(assert) {
  this.render(hbs`{{x-form}}`);

  let text = 'yada yada';
  let selector = 'textarea';
  let value = find(selector).value;
  assert.equal(value, '', 'nothing input yet');
  fillIn(selector, text);

  value = find(selector).value;
  assert.equal(value, text, `expected ${value} to be ${text}`);
});

test('can click a checkbox', function(assert) {
  this.render(hbs`{{x-form}}`);
  let selector = 'input[type="checkbox"]';
  let el = find(selector);
  assert.equal(el.checked, false, 'input NOT checked');
  click(selector);

  el = find(selector);
  assert.ok(el.checked, 'input checked');
});

test('can trigger change on a select input', function(assert) {
  assert.expect(2);
  this.set('externalAction', (val) => {
    assert.equal(val, 'blue');
  });

  this.render(hbs`{{x-form onSelect=(action externalAction)}}`);

  let selector = 'select > option[selected]';
  find(selector).selected = false;
  selector = 'select > option[value="blue"]';
  click(selector);
  find(selector).selected = true;
  selector = 'select';
  triggerEvent(selector, 'change');
  let el = find(selector);
  assert.equal(el.value, 'blue');
});

test('can click to submit form', function(assert) {
  this.render(hbs`{{x-form}}`);

  let el = find('.message');
  assert.ok(el.innerText === '', 'no message printed yet');

  click('.terms-show');
  click('.terms-agree');
  click('button[type="submit"]')

  el = find('.message');
  assert.ok(el.innerText !== '', 'message printed after submit');
});

test('can trigger a keyEvent to submit form', function(assert) {
  this.render(hbs`{{x-form}}`);

  let el = find('.message');
  assert.ok(el.innerText === '', 'no message printed yet');

  click('.terms-show');
  click('button'); // '.terms-agree' is the first button so it will be clicked
  // not using `click('button[type="submit"]')` instead submit with the enter key;
  keyEvent('input[type="text"]', 'keyup', 13);

  el = find('.message');
  assert.ok(el.innerText !== '', 'message printed after submit');
});

test('can click the first link', function(assert) {
  this.render(hbs`{{x-form}}`);

  let el = find('section');
  assert.ok(el.classList.contains('terms-hidden'), 'terms are hidden');

  click(first('a'));
  assert.ok(!el.classList.contains('terms-hidden'), 'terms are NOT hidden');
});
