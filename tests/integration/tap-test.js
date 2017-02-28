import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { tap } from 'ember-native-dom-helpers/test-support/helpers';


moduleForComponent('tap', 'Integration | Test Helper | tap', {
  integration: true
});

// Note: This test will fail in desktop browsers as it doesn't fire
// touch events unless device emulation mode is enabled.
test('It fires touchstart, touchend, and then the click sequence(mousedown -> focus -> mouseup -> click) events on the element with the given selector (in that order)', function(assert) {
  assert.expect(18);
  let index = 0;
  this.onTouchStart = (e) => {
    assert.equal(++index, 1, 'touchstart is fired first');
    assert.ok(true, 'a touchstart event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  }
  this.onTouchEnd = (e) => {
    assert.equal(++index, 2, 'touchend is fired second');
    assert.ok(true, 'a touchend event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  }
  this.onMouseDown = (e) => {
    assert.equal(++index, 3, 'mousedown is fired third');
    assert.ok(true, 'a mousedown event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  }
  this.onFocus = (e) => {
    assert.equal(++index, 4, 'focus is fired forth');
    assert.ok(true, 'a focus event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  }
  this.onMouseUp = (e) => {
    assert.equal(++index, 5, 'mouseup is fired fifth');
    assert.ok(true, 'a mouseup event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  }
  this.onClick = (e) => {
    assert.equal(++index, 6, 'click is fired sixth');
    assert.ok(true, 'a click event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  }

  this.render(hbs`
    <input class="target-element"
      ontouchstart={{onTouchStart}}
      ontouchend={{onTouchEnd}}
      onmouseup={{onMouseUp}}
      onfocus={{onFocus}}
      onclick={{onClick}}
      onmousedown={{onMouseDown}} />
  `);

  tap('.target-element');
});

test('It the touchstart event is defaultPrevented, the focus and mouse events are not fired', function(assert) {
  assert.expect(6);
  let index = 0;
  this.onTouchStart = (e) => {
    assert.equal(++index, 1, 'touchstart is fired first');
    assert.ok(true, 'a touchstart event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    e.preventDefault();
  }
  this.onTouchEnd = (e) => {
    assert.equal(++index, 2, 'touchend is fired second');
    assert.ok(true, 'a touchend event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  }
  this.onMouseDown = () => assert.ok(false, 'mousedown should not be fired');
  this.onFocus = () => assert.ok(false, 'focus should not be fired');
  this.onMouseUp = () => assert.ok(false, 'mouseup should not be fired');
  this.onClick = () => assert.ok(false, 'click should not be fired');

  this.render(hbs`
    <input class="target-element"
      ontouchstart={{onTouchStart}}
      ontouchend={{onTouchEnd}}
      onmouseup={{onMouseUp}}
      onfocus={{onFocus}}
      onclick={{onClick}}
      onmousedown={{onMouseDown}} />
  `);

  tap('.target-element');
});


test('It the touchend event is defaultPrevented, the focus and mouse events are not fired', function(assert) {
  assert.expect(6);
  let index = 0;
  this.onTouchStart = (e) => {
    assert.equal(++index, 1, 'touchstart is fired first');
    assert.ok(true, 'a touchstart event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  }
  this.onTouchEnd = (e) => {
    assert.equal(++index, 2, 'touchend is fired second');
    assert.ok(true, 'a touchend event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    e.preventDefault();
  }
  this.onMouseDown = () => assert.ok(false, 'mousedown should not be fired');
  this.onFocus = () => assert.ok(false, 'focus should not be fired');
  this.onMouseUp = () => assert.ok(false, 'mouseup should not be fired');
  this.onClick = () => assert.ok(false, 'click should not be fired');

  this.render(hbs`
    <input class="target-element"
      ontouchstart={{onTouchStart}}
      ontouchend={{onTouchEnd}}
      onmouseup={{onMouseUp}}
      onfocus={{onFocus}}
      onclick={{onClick}}
      onmousedown={{onMouseDown}} />
  `);

  tap('.target-element');
});
