import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { fillIn } from 'ember-native-dom-helpers';

moduleForComponent('fillIn', 'Integration | Test Helper | fillIn', {
  integration: true
});

test('It fires a focus, updates the value, fires input and fires change on the element with the given selector (in that order)', function(assert) {
  assert.expect(12);
  let index = 0;
  this.value = 'original value';
  this.onFocus = (e) => {
    assert.equal(++index, 1, 'focus is fired first');
    assert.ok(true, 'a focus event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.target.value, 'original value');
  };
  this.onInput = (e) => {
    assert.equal(++index, 2, 'input is fired second');
    assert.ok(true, 'a input event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.target.value, 'new value');
  };
  this.onChange = (e) => {
    assert.equal(++index, 3, 'change is fired third');
    assert.ok(true, 'a change event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.target.value, 'new value');
  };

  this.render(hbs`
    <input class="target-element"
      value={{value}}
      onfocus={{onFocus}}
      oninput={{onInput}}
      onchange={{onChange}} />
  `);
  fillIn('.target-element', 'new value');
});

test('It supports [contenteditable]', function(assert) {
  assert.expect(12);
  let index = 0;
  this.onFocus = (e) => {
    assert.equal(++index, 1, 'focus is fired first');
    assert.ok(true, 'a focus event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.target.innerHTML.trim(), '');
  };
  this.onInput = (e) => {
    assert.equal(++index, 2, 'input is fired second');
    assert.ok(true, 'a input event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.target.innerHTML, 'new <strong>value</strong>');
  };
  this.onChange = (e) => {
    assert.equal(++index, 3, 'change is fired third');
    assert.ok(true, 'a change event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.target.innerHTML, 'new <strong>value</strong>');
  };

  this.render(hbs`<div class="target-element"
      contenteditable
      onfocus={{onFocus}}
      oninput={{onInput}}
      onchange={{onChange}}></div>`);

  fillIn('.target-element', 'new <strong>value</strong>');
});

test('it throws if not contenteditable', function(assert) {
  this.render(hbs`
    <div class="target-element"></div>
  `);

  assert.throws(() => {
    fillIn('.target-element', 'new value');
  }, new Error('Unable to fill element'));
});

test('It accepts an HTMLElement as first argument', function(assert) {
  assert.expect(2);
  this.onInput = (e) => {
    assert.ok(true, 'a click event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };

  this.render(hbs`<input class="target-element" oninput={{onInput}} />`);
  fillIn(document.querySelector('.target-element'), 'foo');
});
