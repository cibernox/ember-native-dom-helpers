import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { waitUntil } from 'ember-native-dom-helpers';
import RSVP from 'rsvp';

moduleForComponent('wait-until', 'Integration | Test Helper | waitUntil', {
  integration: true
});

test('It returns a promise that resolves when the given callback returns a non-falsey value', async function(assert) {
  setTimeout(() => run(() => this.set('timeout1', true)), 100);
  setTimeout(() => run(() => this.set('timeout2', true)), 200);
  setTimeout(() => run(() => this.set('timeout3', true)), 300);

  this.render(hbs`
    {{#if timeout1}}<span id="wait-until-step1">Step 1</span>{{/if}}
    {{#if timeout2}}<span id="wait-until-step2">Step 1</span>{{/if}}
    {{#if timeout3}}<span id="wait-until-step3">Step 1</span>{{/if}}
  `);

  assert.notOk(document.querySelector('#wait-until-step1') || document.querySelector('#wait-until-step2') || document.querySelector('#wait-until-step3'), 'No element is rendered');

  await waitUntil(() => document.querySelector('#wait-until-step1'));
  assert.ok(document.querySelector('#wait-until-step1'), 'The first element appeared');
  assert.notOk(document.querySelector('#wait-until-step2') || document.querySelector('#wait-until-step3'), 'The second and third element are not rendered');

  await waitUntil(() => document.querySelector('#wait-until-step2'));
  assert.ok(document.querySelector('#wait-until-step1'), 'The first element appeared');
  assert.ok(document.querySelector('#wait-until-step2'), 'The second element appeared');
  assert.notOk(document.querySelector('#wait-until-step3'), 'The third element is not rendered');

  await waitUntil(() => document.querySelector('#wait-until-step3'));
  assert.ok(document.querySelector('#wait-until-step1'), 'The first element appeared');
  assert.ok(document.querySelector('#wait-until-step2'), 'The second element appeared');
  assert.ok(document.querySelector('#wait-until-step3'), 'The third element appeared');
});

test('It waits until the given callback returns true', async function(assert) {
  setTimeout(() => run(() => this.set('timeout1', true)), 100);
  setTimeout(() => run(() => this.set('timeout2', true)), 200);
  setTimeout(() => run(() => this.set('timeout3', true)), 300);

  this.render(hbs`
    {{#if timeout1}}<span id="wait-until-step1">Step 1</span>{{/if}}
    {{#if timeout2}}<span id="wait-until-step2">Step 1</span>{{/if}}
    {{#if timeout3}}<span id="wait-until-step3">Step 1</span>{{/if}}
  `);

  assert.notOk(document.querySelector('#wait-until-step1') || document.querySelector('#wait-until-step2') || document.querySelector('#wait-until-step3'), 'No element is rendered');

  await waitUntil(() => document.querySelector('#wait-until-step1'));
  assert.ok(document.querySelector('#wait-until-step1'), 'The first element appeared');
  assert.notOk(document.querySelector('#wait-until-step2') || document.querySelector('#wait-until-step3'), 'The second and third element are not rendered');

  await waitUntil(() => document.querySelector('#wait-until-step2'));
  assert.ok(document.querySelector('#wait-until-step1'), 'The first element appeared');
  assert.ok(document.querySelector('#wait-until-step2'), 'The second element appeared');
  assert.notOk(document.querySelector('#wait-until-step3'), 'The third element is not rendered');

  await waitUntil(() => document.querySelector('#wait-until-step3'));
  assert.ok(document.querySelector('#wait-until-step1'), 'The first element appeared');
  assert.ok(document.querySelector('#wait-until-step2'), 'The second element appeared');
  assert.ok(document.querySelector('#wait-until-step3'), 'The third element appeared');
});

test('It was a default timeout of 1 second', async function(assert) {
  assert.expect(2);
  this.render(hbs``);
  let initialTime = Date.now();
  try {
    await waitUntil(() => document.querySelector('#wait-until-step1'));
  } catch(e) {
    let finalTime = Date.now();
    assert.equal(e, 'waitUntil timed out');
    let elapsedTime = finalTime - initialTime;
    assert.ok(elapsedTime >= 1000 && elapsedTime <= 1500, 'The default timeout is 1s');
  }
});

test('The default timeout can be adjusted using passing options as a second argument', async function(assert) {
  assert.expect(2);
  this.render(hbs``);
  let initialTime = Date.now();
  try {
    await waitUntil(() => document.querySelector('#wait-until-step1'), { timeout: 2000 });
  } catch(e) {
    let finalTime = Date.now();
    assert.equal(e, 'waitUntil timed out');
    let elapsedTime = finalTime - initialTime;
    assert.ok(elapsedTime >= 2000 && elapsedTime <= 2500, 'The timeout was set to 2s');
  }
});

test('The promise resolved with the return value of the callback', async function(assert) {
  assert.expect(1);
  this.render(hbs`<span id="wait-until-thing"></span>`);
  let element = await waitUntil(() => document.querySelector('#wait-until-thing'));
  assert.equal(element.id, 'wait-until-thing', 'waitUntil resolved with the DOM element');
});

test('When callback immediately returns truthy, promise is resolved and callback is not called again', async function(assert) {
  let count = 0;
  function cb() {
    count++;
    return true;
  }
  let initialTime = Date.now();
  await waitUntil(cb);
  let finalTime = Date.now();
  let elapsedTime = finalTime - initialTime;
  assert.equal(count, 1, 'Callback was called');
  assert.ok(elapsedTime < 10, 'The Promise resolved immediately');
  await new RSVP.Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(count, 1, 'Callback was called just once');
});
