import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn, click, keyEvent, triggerEvent } from 'ember-native-dom-helpers/test-support/helpers';

moduleForComponent('x-form', 'Integration | Component | x-form', {
  integration: true
});

const find = (selector) => document.querySelectorAll(`#ember-testing ${selector}`);

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
  let value = find(selector)[0].value;
  assert.equal(value, '', 'nothing input yet');
  fillIn(selector, text);

  value = find(selector)[0].value;
  assert.equal(value, text, `expected ${value} to be ${text}`);
});

test('can fill in a textarea field', function(assert) {
  this.render(hbs`{{x-form}}`);

  let text = 'yada yada';
  let selector = 'textarea';
  let value = find(selector)[0].value;
  assert.equal(value, '', 'nothing input yet');
  fillIn(selector, text);

  value = find(selector)[0].value;
  assert.equal(value, text, `expected ${value} to be ${text}`);
});

test('can click a checkbox', function(assert) {
  this.render(hbs`{{x-form}}`);
  let selector = 'input[type="checkbox"]';
  let el = find(selector)[0];
  assert.equal(el.checked, false, 'input NOT checked');
  click(selector);

  el = find(selector)[0];
  assert.ok(el.checked, 'input checked');
});

test('can trigger change on a select input', function(assert) {
  assert.expect(2);
  this.set('externalAction', (val) => {
    assert.equal(val, 'blue');
  });

  this.render(hbs`{{x-form onSelect=(action externalAction)}}`);

  let selector = 'select > option[selected]';
  find(selector)[0].selected = false;
  selector = 'select > option[value="blue"]';
  click(selector);
  find(selector)[0].selected = true;
  selector = 'select';
  // await
  triggerEvent(selector, 'change');
  let el = find(selector)[0];
  assert.equal(el.value, 'blue');
});

test('can trigger a keyEvent', function(assert) {
  this.render(hbs`{{x-form}}`);

  let selector = '.message';
  let el = find(selector)[0];
  assert.ok(el.innerText === '', 'no message printed yet');

  selector = '.terms-show';
  click(selector);
  selector = '.terms-agree';
  click(selector);
  selector = 'input[type="text"]';
  // await
  keyEvent(selector, 'keyup', 13);

  selector = '.message';
  el = find(selector)[0];
  assert.ok(el.innerText !== '', 'message printed after submit');
});
