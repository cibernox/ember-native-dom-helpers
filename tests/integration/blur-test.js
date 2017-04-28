import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { blur } from 'ember-native-dom-helpers';

moduleForComponent('blur', 'Integration | Test Helper | blur', {
  integration: true
});

test('It accepts an HTMLElement as first argument', function(assert) {
  assert.expect(2);
  this.onBlur = (e) => {
    assert.ok(true, 'a blur event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };

  this.render(hbs`<input class="target-element" onblur={{onBlur}} />`);

  let targetElement = document.querySelector('.target-element');

  targetElement.focus();
  blur(targetElement);
});

test('It accepts a CSS selector as first argument', function(assert) {
  assert.expect(2);
  this.onBlur = (e) => {
    assert.ok(true, 'a blur event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };

  this.render(hbs`<input class="target-element" onblur={{onBlur}} />`);

  document.querySelector('.target-element').focus();
  blur('.target-element');
});

test('It resets focus to body, when blur event was fired', function(assert) {
  let docIsFocused = document.hasFocus && document.hasFocus();
  let assertions = docIsFocused ? 5 : 4;

  assert.expect(assertions);

  this.onBlur = (e) => {
    assert.ok(true, 'a blur event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };

  this.render(hbs`
    <input class="target-element" onblur={{onBlur}} />
    <input class="other-element" />
  `);

  let [bodyElement] = document.getElementsByTagName('body');
  let targetElement = document.querySelector('.target-element');

  assert.equal(document.activeElement, bodyElement, 'body is focused by default');

  targetElement.focus();
  assert.equal(document.activeElement, targetElement, '.target-element has focus');

  blur('.target-element');

  if (docIsFocused) {
    assert.equal(document.activeElement, bodyElement, 'body regained focus after blur');
  }
});
