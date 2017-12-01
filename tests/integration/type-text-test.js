import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { typeText } from 'ember-native-dom-helpers';

moduleForComponent('typeText', 'Integration | Test Helper | typeText', {
  integration: true
});

test('It calls the input and change twice, once for cleaning and once for filling', function(assert) {
  assert.expect(4);
  let onChangeIndex = 0;
  this.onChange = (e) => {
    let { value }  = e.target;
    if (onChangeIndex === 0) {
      assert.equal(value, '');
    } else {
      assert.equal(value, 'new value');
    }
    onChangeIndex += 1;
  };

  let onInputIndex = 0;
  this.onInput = (e) => {
    let { value }  = e.target;
    if (onInputIndex === 0) {
      assert.equal(value, '');
    } else {
      assert.equal(value, 'new value');
    }
    onInputIndex += 1;
  };

  this.value = 'old value';

  this.render(hbs`
    <input class="target-element"
      value={{value}}
      onchange={{onChange}}
      oninput={{onInput}} />
  `);
  typeText('.target-element', 'new value');
});

test('It calls keydown and keyup events for backspace, and then for each character', function(assert) {
  let message = '12345';

  assert.expect(2 * (message.length + 1));

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
      onkeyup={{onKeyUp}} />
  `);
  typeText('.target-element', message);
});
