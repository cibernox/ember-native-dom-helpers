import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { waitFor } from 'ember-native-dom-helpers';

moduleForComponent('wait-for', 'Integration | Test Helper | waitFor', {
  integration: true
});

test('It returns a promise that resolves when the given selector is on the page', async function(assert) {
  setTimeout(() => run(() => this.set('timeout1', true)), 100);
  setTimeout(() => run(() => this.set('timeout2', true)), 200);
  setTimeout(() => run(() => this.set('timeout3', true)), 300);

  this.render(hbs`
    {{#if timeout1}}<span id="wait-for-step1">Step 1</span>{{/if}}
    {{#if timeout2}}<span id="wait-for-step2">Step 1</span>{{/if}}
    {{#if timeout3}}<span id="wait-for-step3">Step 1</span>{{/if}}
  `);

  assert.notOk(document.querySelector('#wait-for-step1') || document.querySelector('#wait-for-step2') || document.querySelector('#wait-for-step3'), 'No element is rendered');

  await waitFor('#wait-for-step1');
  assert.ok(document.querySelector('#wait-for-step1'), 'The first element appeared');
  assert.notOk(document.querySelector('#wait-for-step2') || document.querySelector('#wait-for-step3'), 'The second and third element are not rendered');

  await waitFor('#wait-for-step2');
  assert.ok(document.querySelector('#wait-for-step1'), 'The first element appeared');
  assert.ok(document.querySelector('#wait-for-step2'), 'The second element appeared');
  assert.notOk(document.querySelector('#wait-for-step3'), 'The third element is not rendered');

  await waitFor('#wait-for-step3');
  assert.ok(document.querySelector('#wait-for-step1'), 'The first element appeared');
  assert.ok(document.querySelector('#wait-for-step2'), 'The second element appeared');
  assert.ok(document.querySelector('#wait-for-step3'), 'The third element appeared');
});

test('It was a default timeout of 1 second', async function(assert) {
  assert.expect(2);
  this.render(hbs``);
  let initialTime = Date.now();
  try {
    await waitFor('#wait-for-step1');
  } catch(e) {
    let finalTime = Date.now();
    assert.ok(e, 'waitFor timed out');
    let elapsedTime = finalTime - initialTime;
    assert.ok(elapsedTime >= 1000 && elapsedTime <= 1500, 'The default timeout is 1s');
  }
});

test('The default timeout can be adjusted using passing options as a second argument', async function(assert) {
  assert.expect(2);
  this.render(hbs``);
  let initialTime = Date.now();
  try {
    await waitFor('#wait-for-step1', { timeout: 2000 });
  } catch(e) {
    let finalTime = Date.now();
    assert.ok(e, 'waitFor timed out');
    let elapsedTime = finalTime - initialTime;
    assert.ok(elapsedTime >= 2000 && elapsedTime <= 2500, 'The timeout was set to 2s');
  }
});

test('The promise resolves with the element (or elements) found', async function(assert) {
  assert.expect(1);
  this.render(hbs`<span id="wait-for-thing"></span>`);
  let element = await waitFor('#wait-for-thing');
  assert.equal(element.id, 'wait-for-thing', 'waitFor resolved with the DOM element');
});

test('when it receives a `count` option, it returns a promise that resolves when the given selector is on the page that number of times', async function(assert) {
  assert.expect(5);
  setTimeout(() => run(() => this.set('timeout1', true)), 100);
  setTimeout(() => run(() => this.set('timeout2', true)), 200);
  setTimeout(() => run(() => this.set('timeout3', true)), 300);

  this.render(hbs`
    {{#if timeout1}}<span id="wait-for-step1" class="wait-for-step">Step 1</span>{{/if}}
    {{#if timeout2}}<span id="wait-for-step2" class="wait-for-step">Step 1</span>{{/if}}
    {{#if timeout3}}<span id="wait-for-step3" class="wait-for-step">Step 1</span>{{/if}}
  `);

  assert.notOk(document.querySelector('#wait-for-step1') || document.querySelector('#wait-for-step2') || document.querySelector('#wait-for-step3'), 'No element is rendered');

  await waitFor('.wait-for-step', { count: 3 });

  assert.ok(document.querySelector('#wait-for-step1'), 'The first element appeared');
  assert.ok(document.querySelector('#wait-for-step2'), 'The second element appeared');
  assert.ok(document.querySelector('#wait-for-step3'), 'The third element appeared');
  try {
    await waitFor('.wait-for-step', { count: 4 });
  } catch(_e) {
    assert.ok(true, 'The last waitFor never resolves because there isn\'t enough elements');
  }
});

test('when it receives a `count` option, it resolves with the array of elements', async function(assert) {
  assert.expect(1);
  this.render(hbs`<span class="wait-for-thing"></span><span class="wait-for-thing"></span><span class="wait-for-thing"></span>`);
  let elements = await waitFor('.wait-for-thing', { count: 3 });
  assert.equal(elements.length, 3, 'waitFor resolved with the 3 DOM elements');
});
