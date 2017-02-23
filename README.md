![Build Status](https://travis-ci.org/cibernox/ember-native-dom-helpers.svg?branch=master)

# ember-native-dom-helpers

Test helpers for integration tests that mimic the behaviour of the acceptance test
helpers provided by Ember.

Use this addon as a way to start the gradual migration towards the future "testing unification" RFC setup. That RFC proposes only native DOM.

## Usage

```js
import { click, fillIn, find, keyEvent, triggerEvent } from 'ember-native-dom-helpers/test-support/helpers';

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

## Standard DOM elements returned using a `find` helper

- The `find` helper uses `document.querySelectorAll` and will return a single `HTMLElement`
  or a `NodeList` of elements. The `find` helper will query the DOM within `#ember-testing`
- To use a different value from your `config/environment.js` settings, add to `tests/test-helper.js`…

```js
import settings from 'ember-native-dom-helpers/test-support/settings';
import config from '../config/environment';
const { APP: { rootElement } } = config;

settings.rootElement = rootElement || settings.rootElement;
```

## Helpers

- `click(selector, eventOptions)`
- `fillIn(selector, text)`
- `find(selector, contextHTMLElement)` (query within test DOM, `#ember-testing`)
- `keyEvent(selector, type, keyCode)` (type being `keydown`, `keyup` or `keypress`)
- `triggerEvent(selector, type, options)`
