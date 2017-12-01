import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { typeText } from 'ember-native-dom-helpers';

moduleForComponent('typeText', 'Integration | Test Helper | typeText', {
  integration: true
});

test('It calls the change event after successfull writing', function(assert) {
  assert.expect(1);

  this.onChange = (e) => {
    assert.equal(e.target.value, 'new value');
  };

  this.render(hbs`
    <input class="target-element"
      value={{value}}
      onchange={{onChange}} />
  `);
  typeText('.target-element', 'new value');
});

test('It calls keydown, input and keyup events for backspace, and then for each character', function(assert) {
  let message = '12345';

  assert.expect(3 * (message.length + 1));

  let onKeyDownIndex = -1;
  this.onKeyDown = (e) => {
    let { keyCode } = e;
    if (onKeyDownIndex === -1) {
      assert.equal(keyCode, 8);
    } else {
      assert.equal(String.fromCharCode(keyCode), message[onKeyUpIndex]);
    }
    onKeyDownIndex += 1;
  };

  let onInputIndex = 0;
  this.onInput = (e) => {
    if (onInputIndex === 0) {
      assert.equal(e.target.value, '');
    } else {
      assert.equal(e.target.value, message.substr(0, onInputIndex));
    }
    onInputIndex += 1;
  };

  let onKeyUpIndex = -1;
  this.onKeyUp = (e) => {
    let { keyCode } = e;
    if (onKeyUpIndex === -1) {
      assert.equal(keyCode, 8);
    } else {
      assert.equal(String.fromCharCode(keyCode), message[onKeyUpIndex]);
    }
    onKeyUpIndex += 1;
  };

  this.value = 'old value';

  this.render(hbs`
    <input class="target-element"
      value={{value}}
      onkeydown={{onKeyDown}}
      onkeyup={{onKeyUp}}
      oninput={{onInput}}
       />
  `);
  typeText('.target-element', message);
});
