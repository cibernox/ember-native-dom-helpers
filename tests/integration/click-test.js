import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click } from 'ember-native-dom-helpers';

moduleForComponent('click', 'Integration | Test Helper | click', {
  integration: true
});

test('It fires mousedown, focus, mouseup and click events on the element with the given selector (in that order)', function(assert) {
  assert.expect(12);
  let index = 0;
  this.onMouseDown = (e) => {
    assert.equal(++index, 1, 'mousedown is fired first');
    assert.ok(true, 'a mousedown event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };
  this.onFocus = (e) => {
    assert.equal(++index, 2, 'focus is fired second');
    assert.ok(true, 'a focus event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };
  this.onMouseUp = (e) => {
    assert.equal(++index, 3, 'mouseup is fired third');
    assert.ok(true, 'a mouseup event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };
  this.onClick = (e) => {
    assert.equal(++index, 4, 'click is fired third');
    assert.ok(true, 'a click event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };

  this.render(hbs`
    <input class="target-element"
      onmouseup={{onMouseUp}}
      onfocus={{onFocus}}
      onclick={{onClick}}
      onmousedown={{onMouseDown}} />
  `);
  click('.target-element');
});

test('It accepts an HTMLElement as first argument', function(assert) {
  assert.expect(2);
  this.onClick = (e) => {
    assert.ok(true, 'a click event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };

  this.render(hbs`<input class="target-element" onclick={{onClick}} />`);
  click(document.querySelector('.target-element'));
});

test('It accepts an HTMLElement as second argument to scope the search to a parent', function(assert) {
  assert.expect(3);
  this.onClick = (e) => {
    assert.ok(true, 'a click event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.ok(e.target.classList.contains('cell-2'), 'The cell of the second row was clicked');
  };

  this.render(hbs`
    <div class="row-1"><div class="cell cell-1" onclick={{action onClick}}></div></div>
    <div class="row-2"><div class="cell cell-2" onclick={{action onClick}}></div></div>
  `);
  click('.cell', document.querySelector('.row-2'));
});

test('works in the SVG namespace', function(assert) {
  assert.expect(1);
  this.onClick = () => {
    assert.ok(true, 'a click event is fired');
  };

  this.render(hbs`<svg><path id="the-path" {{action onClick}}></path></svg>`);
  click('#the-path');
});

test('works when it receives an SVG Element', function(assert) {
  assert.expect(1);
  this.onClick = () => {
    assert.ok(true, 'a click event is fired');
  };

  this.render(hbs`<svg><path id="the-path" {{action onClick}}></path></svg>`);
  click(document.querySelector('#the-path'));
});

test('in can receive an object of options as second argument, that is reused for all the mouse events fired in sequence', function(assert) {
  assert.expect(18);
  let index = 0;
  this.onMouseDown = (e) => {
    assert.equal(++index, 1, 'mousedown is fired first');
    assert.ok(true, 'a mousedown event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.screenX, 999, 'The screenX value was taken from the passed options');
    assert.equal(e.screenY, 888, 'The screenX value was taken from the passed options');
  };
  this.onFocus = (e) => {
    assert.equal(++index, 2, 'focus is fired second');
    assert.ok(true, 'a focus event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };
  this.onMouseUp = (e) => {
    assert.equal(++index, 3, 'mouseup is fired third');
    assert.ok(true, 'a mouseup event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.screenX, 999, 'The screenX value was taken from the passed options');
    assert.equal(e.screenY, 888, 'The screenX value was taken from the passed options');
  };
  this.onClick = (e) => {
    assert.equal(++index, 4, 'click is fired third');
    assert.ok(true, 'a click event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.screenX, 999, 'The screenX value was taken from the passed options');
    assert.equal(e.screenY, 888, 'The screenX value was taken from the passed options');
  };

  this.render(hbs`
    <input class="target-element"
      onmouseup={{onMouseUp}}
      onfocus={{onFocus}}
      onclick={{onClick}}
      onmousedown={{onMouseDown}} />
  `);
  click('.target-element', { screenX: 999, screenY: 888 });
});

test('in can receive an object of options as third argument if the second argument is a context HTMLElement', function(assert) {
  assert.expect(18);
  let index = 0;
  this.onMouseDown = (e) => {
    assert.equal(++index, 1, 'mousedown is fired first');
    assert.ok(true, 'a mousedown event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.screenX, 999, 'The screenX value was taken from the passed options');
    assert.equal(e.screenY, 888, 'The screenX value was taken from the passed options');
  };
  this.onFocus = (e) => {
    assert.equal(++index, 2, 'focus is fired second');
    assert.ok(true, 'a focus event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };
  this.onMouseUp = (e) => {
    assert.equal(++index, 3, 'mouseup is fired third');
    assert.ok(true, 'a mouseup event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.screenX, 999, 'The screenX value was taken from the passed options');
    assert.equal(e.screenY, 888, 'The screenX value was taken from the passed options');
  };
  this.onClick = (e) => {
    assert.equal(++index, 4, 'click is fired third');
    assert.ok(true, 'a click event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.screenX, 999, 'The screenX value was taken from the passed options');
    assert.equal(e.screenY, 888, 'The screenX value was taken from the passed options');
  };

  this.render(hbs`
    <div class="wrapper-target-test">
      <input class="target-element"
        onmouseup={{onMouseUp}}
        onfocus={{onFocus}}
        onclick={{onClick}}
        onmousedown={{onMouseDown}} />
    </div>
  `);
  click('.target-element', document.querySelector('.wrapper-target-test'), { screenX: 999, screenY: 888 });
});
