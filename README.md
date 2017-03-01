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

```js
import { click, fillIn, find, findAll, keyEvent, triggerEvent } from 'ember-native-dom-helpers/test-support/helpers';

moduleForComponent('my-component', 'Integration | Component | my-component', {
  integration: true
});


test('I can interact with my component', function(assert) {
  this.render(hbs```
    {{my-component}}
  ```);

  fillIn('.some-input');
  click('.main-button');
  keyEvent('.other-input', 'keyup', 40); // down arrow
  triggerEvent('.some-drop-area', 'mouseenter');
  assert.ok(find('.result-of-event-happened'));
  assert.equal(findAll('.result-list-item').length, 3);
})
```

## Advantages compared with `this.$(selector).click()`

The main advantages are:

- Fire native events: In Ember, when adding events with the `onclick={{action "foo"}}` syntax,
  dispatching jQuery events leads to the action being called twice. Besides there is subtle
  differences between jQuery and Native events and can bite you. Firing native events fixes
  that problem but they are very verbose and there is browsers incompatibilities.
  This makes firing native events a no-brainer.

- Runloop aware: This helpers automatically spawn a runloop, so you don't need to wrap
  every interation with `Ember.run(() => /* interact with element */ );`.

- `wait` by default: All the helpers return the `wait()` promise, making possible wait
  for asynchronous side-effects with `async/await`.

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
- The `findAll` helper uses `document.querySelectorAll` and returns `NodeList` with zero or more elements.
- Both `find` and `findAll` helpers query the DOM within `#ember-testing`.
- To use a different value from your `config/environment.js` settings, add to `tests/test-helper.js`…

```js
import settings from 'ember-native-dom-helpers/test-support/settings';
import config from '../config/environment';
const { APP: { rootElement } } = config;

settings.rootElement = rootElement || settings.rootElement;
```

### What if I prefer jQuery collections over native DOM

Fear not. If you prefer to use jQuery, just wrap the result and do your thing:

```js
assert.equal($(find('.my-class')).attr('aria-owns'), '#id123')
```

## Helpers

- `click(selector, eventOptions)`
- `tap(selector, eventOptions)`
- `fillIn(selector, text)`
- `find(selector, contextHTMLElement)` (query for an element in test DOM, `#ember-testing`)
- `findAll(selector, contextHTMLElement)` (query for elements in test DOM, `#ember-testing`)
- `findWithAssert(selector, contextHTMLElement)` (same as `find`, but raises Error if no result)
- `keyEvent(selector, type, keyCode)` (type being `keydown`, `keyup` or `keypress`)
- `triggerEvent(selector, type, options)`

## Notes of `tap`

In order for `tap` to work, your browser has to support touch events. Desktop Chrome and Firefox
have touch events disabled unless the device emulation mode is on.
In order to enable touch events in your CI, you need to configure testem like the `testem.js`
file on this repo.
