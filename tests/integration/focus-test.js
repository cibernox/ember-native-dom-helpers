import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { focus } from 'ember-native-dom-helpers/test-support/focus';

moduleForComponent('focus', 'Integration | Test Helper | focus', {
  integration: true
});

test('It accepts an HTMLElement as first argument', function(assert) {
  assert.expect(2);
  this.onFocus = (e) => {
    assert.ok(true, 'a focus event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };

  this.render(hbs`<input class="target-element" onfocus={{onFocus}} />`);
  focus(document.querySelector('.target-element'));
});

test('It blurs the focused input before firing focus event on another one', function(assert) {
  let docIsFocused = document.hasFocus && document.hasFocus();
  let assertions = docIsFocused ? 8 : 4;
  assert.expect(assertions);

  let index = 0;
  this.onBlur = (e) => {
    assert.equal(++index, 1, 'blur is fired before focus');
    assert.ok(true, 'a blur event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.target.value, 'a');
  };
  this.onFocus = (e) => {
    assert.equal(++index, docIsFocused ? 2 : 1, 'focus is fired');
    assert.ok(true, 'a focus event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.target.value, 'b');
  };

  this.render(hbs`
    <input class="other-element" onblur={{onBlur}} value="a" />
    <input class="target-element" onfocus={{onFocus}} value="b" />
  `);
  document.querySelector('.other-element').focus();

  focus(document.querySelector('.target-element'));
});
