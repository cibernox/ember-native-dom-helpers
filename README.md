![Build Status](https://travis-ci.org/cibernox/ember-native-dom-helpers.svg?branch=master)

# ember-native-dom-helpers

Test helpers for integration tests that mimic the behaviour of the acceptance
test helpers provided by Ember.

Use this addon as a way to start the gradual migration towards the future
"testing unification" [RFC][emberjs/rfcs/pull/119] which proposes only native DOM.

See the [Grand Testing Unification RFC][emberjs/rfcs/pull/119]

- [shared-test-helpers]
- [example-migration-of-component-integration-test]

[emberjs/rfcs/pull/119]: https://github.com/emberjs/rfcs/pull/119
[shared-test-helpers]: https://github.com/rwjblue/rfcs/blob/42/text/0000-grand-testing-unification.md#shared-test-helpers
[example-migration-of-component-integration-test]: https://github.com/rwjblue/rfcs/blob/42/text/0000-grand-testing-unification.md#example-migration-of-component-integration-test

**Status**: (Pre) 1.0, although we have a good idea what the needs are for
test helpers, we are working though a few points on what changes are needed
when using only standard DOM APIs (i.e. without jQuery).

## Usage

### Integration tests

```js
import { click, fillIn, find, findAll, keyEvent, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('my-component', 'Integration | Component | my-component', {
  integration: true
});


test('I can interact with my component', async function(assert) {
  this.render(hbs```
    {{my-component}}
  ```);

  await fillIn('.some-input');
  await click('.main-button');
  await keyEvent('.other-input', 'keyup', 40); // down arrow
  await triggerEvent('.some-drop-area', 'mouseenter');

  assert.ok(find('.result-of-event-happened'));
  assert.equal(findAll('.result-list-item').length, 3);
})
```

### Acceptance tests

You can use the exact same helpers for your acceptance tests. All interaction helpers like
`click`, `fillIn` et al. return a promise that that fullfils when "the world has settled"
(that is, there is no pending requests or promises and the runloop has be drained), which
is what the `andThen` acceptance helper used to do.
However now this helper can be replace by the `async`/`await` syntax in ES2017 yielding
easier to read tests:

```js
import { visit, click, find, fillIn } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | Sign up');

test('Usage awaiting the world to settle', async function(assert) {
  await visit('/sign-up');

  await fillIn('.first-name', 'Chuck');
  await fillIn('.last-name', 'Berry');
  await click('.submit-btn');

  assert.ok(find('.welcome-msg'), 'There is a welcome banner');
  assert.equal(find('.welcome-msg-name'), 'Chuck');
});
```

## Advantages compared with `this.$(selector).click()`

The main advantages are:

- Fire native events: In Ember, when adding events with the `onclick={{action "foo"}}` syntax,
  dispatching jQuery events leads to the action being called twice. Besides there is subtle
  differences between jQuery and Native events and can bite you. Firing native events fixes
  that problem but they are very verbose and there is browsers incompatibilities.
  This addon makes firing native events a no-brainer.

- Runloop aware: This helpers automatically spawn a runloop, so you don't need to wrap
  every interaction with `Ember.run(() => /* interact with element */ );`.

- `wait` by default: All the helpers return the `wait()` promise, making possible wait
  for asynchronous side-effects with `async/await`. (Note that for using async/await in
  browsers without native support you must install [ember-maybe-import-regenerator](https://github.com/machty/ember-maybe-import-regenerator))

  ```js
  test('some test', async function(assert) {
    this.render(hbs```{{my-component}}```);

    await click('.my-button');

    assert.ok('something happened');
  });
  ```


- More real behaviour: When a clicks on an element `click` is not the only event fired. In a
  real click the sequence of events is `mousedown`, `focus`, `mouseup`, `click`. When a user
  fills in an input the sequence of events is `focus`, `<mutate-value>`, `input` and `change`.
  The helpers provided by this addon fire those events in the right order simulating more
  closely how a real user would interact with the page.

## Standard DOM elements returned using a `find`/`findAll` helpers

- The `find` helper uses `document.querySelector` and will return a single `HTMLElement` or `null`.
- The `findAll` helper uses `document.querySelectorAll` and returns an `Array` with zero or more elements.
- Both `find` and `findAll` helpers query the DOM within `#ember-testing`.
- To use a different value from your `config/environment.js` settings, add to `tests/test-helper.js`…

```js
import { settings } from 'ember-native-dom-helpers';
import config from '../config/environment';
const { APP: { rootElement } } = config;

settings.rootElement = rootElement || settings.rootElement;
```

### What if I prefer jQuery collections over native DOM

Fear not. If you prefer to use jQuery, just wrap the result and do your thing:

```js
assert.equal($(find('.my-class')).attr('aria-owns'), '#id123')
```

## Testing an unsettled world

There is one new helper in this addon that enables some testing patters that weren't
previously easy to perform using traditional methods.

Since the `andThen` helper waits for the app to settle (no pending requests or promises)
and in integration tests every interaction is wrapped in `Ember.run`, there was no easy way
of testing transient state like loading substates or the state of a components while some promise
is pending without a awkward setup of timeouts.

Now however thanks to explicit usage of promises and the `waitUntil` helper you can
perform assertions on unsettled states:

```js
import { visit, click, find, fillIn, waitUntil, currentURL } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | Sign up');

test('Usage awaiting the world to settle', async function(assert) {
  await visit('/login');

  await fillIn('.email', '007@gov.uk');
  await fillIn('.password', 'goldeneye');
  let promise = click('.submit-btn');

  // We wait until the loading substate, that takes 200ms to appear, is displayed
  await waitUntil(() => find('.susbstate-spinner'));
  assert.equal(find('.loading-substate-header').textContent.trim(), 'Loading mission. Please wait, Mr. Bond');

  await promise; // now we wait until the dashboard is fully loaded
  assert.equal(currentURL(), '/dashboard');
  assert.equal(find('.section-header').textContent, 'Main dashboard');
});
```

## I WANT IT NOW, IS THERE A SHORTCUT?

Yes, there is an codemod that will help you transform your test suite to this new style "automatically".
Check https://github.com/simonihmig/ember-native-dom-helpers-codemod.

The codemod can't make a *perfect* convertion, but it will do most of the work for you.

## Helpers

- `click(selectorOrHTMLElement, eventOptions)`
- `tap(selectorOrHTMLElement, eventOptions)`
- `fillIn(selectorOrHTMLElement, text)`
- `find(selector, contextHTMLElement)` (query for an element in test DOM, `#ember-testing`)
- `findAll(selector, context)` (query for elements in test DOM, `#ember-testing`)
- `findWithAssert(selector, contextHTMLElement)` (same as `find`, but raises an Error if no result)
- `keyEvent(selectorOrHTMLElement, type, keyCode, modifiers)` (type being `keydown`, `keyup` or `keypress`, modifiers being object with `{ ctrlKey: false, altKey: false, shiftKey: false, metaKey: false }`)
- `triggerEvent(selectorOrHTMLElement, type, options)`
- `focus(selectorOrHTMLElement)`
- `blur(selectorOrHTMLElement)`
- `scrollTo(selectorOrHTMLElement, x, y)`
- `selectFiles(selectorOrHTMLElement, files = [])` (selects the file(s)/Blob(s) to the given `input[type=file]`. [Example](https://github.com/cibernox/ember-native-dom-helpers/blob/2f5f4d1df29d0d546505b515ca3e11721a86274b/tests/integration/select-files-test.js#L32-L35)
- `visit(url)` (only available in acceptance. Raises an error in integration)
- `waitUntil(function, options)` (Polls the page until the given callback returns a truthy value, or timesout after 1s)
- `currentURL()` Identical to the one provided by Ember.
- `currentPath()` Identical to the one provided by Ember.
- `currentRouteName()` Identical to the one provided by Ember.


## Notes of `tap`

In order for `tap` to work, your browser has to support touch events. Desktop Chrome and Firefox
have touch events disabled unless the device emulation mode is on.
In order to enable touch events in your CI, you need to configure testem like the `testem.js`
file on this repo.
