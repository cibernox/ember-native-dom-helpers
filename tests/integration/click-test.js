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
