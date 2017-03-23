import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('triggerEvent', 'Integration | Test Helper | triggerEvent', {
  integration: true
});

test('It fires events of the given type, no questions asked', function(assert) {
  assert.expect(2);

  this.onMouseEnter = (e) => {
    assert.ok(true, 'a focus event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };

  this.render(hbs`<input class="target-element" onmouseenter={{onMouseEnter}} />`);
  triggerEvent('.target-element', 'mouseenter');
});

test('It accepts an HTMLElement as first argument', function(assert) {
  assert.expect(2);
  this.onMouseEnter = (e) => {
    assert.ok(true, 'a click event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };

  this.render(hbs`<input class="target-element" onmouseenter={{onMouseEnter}} />`);
  triggerEvent(document.querySelector('.target-element'), 'mouseenter');
});
