import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { visit, click, find, fillIn, waitUntil, currentURL, currentRouteName } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | usage in acceptance', {
  beforeEach() {
    window.server.timing = 300;
  }
});

test('Usage awaiting the world to settle', async function(assert) {
  await visit('/signup-example');

  assert.ok(find('.signup-example-form'), 'The signup form is displayed');
  await fillIn('.signup-example-form__email', 'some@email.com');
  await fillIn('.signup-example-form__password', '123123');
  await fillIn('.signup-example-form__password-confirmation', '123123');
  await click('.signup-example-form__submit-btn');

  assert.ok(find('.dashboard-example-header'), 'We are on the dashboard now');
});

test('Usage using `waitUntil` to test unsettled state', async function(assert) {
  await visit('/signup-example');
  assert.equal(currentURL(), '/signup-example', 'The URL has updated');
  assert.equal(currentRouteName(), 'signup-example', 'The currentRouteName has updated');

  assert.ok(find('.signup-example-form'), 'The signup form is displayed');
  fillIn('.signup-example-form__email', 'some@email.com');
  fillIn('.signup-example-form__password', '123123');
  fillIn('.signup-example-form__password-confirmation', '123123');
  let submitPromise = click('.signup-example-form__submit-btn');

  await waitUntil(() => find('.dashbord-loading-substate-header'));
  assert.equal(find('.dashbord-loading-substate-header').textContent.trim(), 'Loading data for your dashboard. Please be patient.');

  await submitPromise;
  assert.equal(currentURL(), '/dashboard-example/1', 'The URL has updated');
  assert.equal(currentRouteName(), 'dashboard-example', 'The currentRouteName has updated');
  assert.ok(find('.dashboard-example-header'), 'We are on the dashboard now');
});
