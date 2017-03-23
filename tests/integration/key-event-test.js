import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { keyEvent } from 'ember-native-dom-helpers';

moduleForComponent('keyEvent', 'Integration | Test Helper | keyEvent', {
  integration: true
});

test('It can fire keydown events', function(assert) {
  assert.expect(4);
  this.onKeyDown = (e) => {
    assert.ok(true, 'a focus event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.keyCode, 40, 'The event has the right keyCode');
    assert.equal(e.which, 40, 'The event has the right which');
  };

  this.render(hbs`<input class="target-element" onkeydown={{onKeyDown}} />`);
  keyEvent('.target-element', 'keydown', 40);
});

test('It can fire keyup events', function(assert) {
  assert.expect(4);
  this.onKeyUp = (e) => {
    assert.ok(true, 'a focus event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    assert.equal(e.keyCode, 40, 'The event has the right keyCode');
    assert.equal(e.which, 40, 'The event has the right which');
  };

  this.render(hbs`<input class="target-element" onkeyup={{onKeyUp}} />`);
  keyEvent('.target-element', 'keyup', 40);
});

test('It can fire keypress events', function(assert) {
  let done = assert.async();
  this.onKeyPress = (e) => {
    assert.ok(true, 'a focus event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
    if (e.hasOwnProperty('which')) {
      // event.which is deprecated, favor `keyCode`
      assert.equal(e.which, 40, 'The event has the right which');
    }
    if (e.hasOwnProperty('keyCode')) {
      assert.equal(e.keyCode, 40, 'The event has the right keyCode');
    }
    done();
  };

  this.render(hbs`<input class="target-element" onkeypress={{onKeyPress}} />`);
  keyEvent('.target-element', 'keypress', 40);
});

test('It accepts an HTMLElement as first argument', function(assert) {
  assert.expect(2);
  this.onKeyDown = (e) => {
    assert.ok(true, 'a click event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };

  this.render(hbs`<input class="target-element" onkeydown={{onKeyDown}} />`);
  keyEvent(document.querySelector('.target-element'), 'keydown', 13);
});
