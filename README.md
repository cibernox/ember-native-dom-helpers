# ember-native-dom-helpers

Test helpers for integration tests in ember that mimic the behaviour the acceptance 
helpers provided by ember.

## Usage

```js
import { click, fillIn } from 'ember-native-dom-helpers/test-support/helpers';

moduleForComponent('my-component', 'Integration | Component | my-component', {
  integration: true
});


test('I can click my component', function(assert) {
  this.render(hbs```
    {{my-component}}
  ```);

  fillIn('.some-input');
  click('.main-button');
  assert.ok('someting happened');
})
```

## Advantages compared with `this.$(selector).click()`

The main advantages are:

- Fire native events: In ember when adding events with `onclick={{action "foo"}}` firing 
  events with jQuery leadns to the action being fired twice. Firing native events fixes
  that problem but they are very verbose to use. This helpers simplify the process.

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

## Helpers

- `click(selector, eventOptions)`
- `fillIn(selector, text)`
