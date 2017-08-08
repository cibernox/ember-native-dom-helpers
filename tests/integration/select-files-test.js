import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { selectFiles } from 'ember-native-dom-helpers';

moduleForComponent('selectFiles', 'Integration | Test Helper | selectFiles', {
  integration: true
});

test('It provids a file under the events target', function(assert) {
  assert.expect(3);
  this.onChange = (e) => {
    assert.equal(e.target.files.length, 1, 'file is present');
    assert.equal(e.target.files[0].type, 'plain/text', 'file has the set type');
    assert.equal(e.target.files[0].size, 7, 'file has the set size');
  };

  this.render(hbs`<input class="target-element" type="file" onchange={{onChange}} />`);
  selectFiles('.target-element', new Blob(['texters'], { type: 'plain/text' }));
});

test('Ability to handle multiple files', function(assert) {
  assert.expect(5);
  this.onChange = (e) => {
    assert.equal(e.target.files.length, 2, 'files are present');
    assert.equal(e.target.files[0].type, 'plain/text', 'first file has the set type');
    assert.equal(e.target.files[0].size, 7, 'first file has the set size');
    assert.equal(e.target.files[1].type, 'image/jpeg', 'second file has the set type');
    assert.equal(e.target.files[1].size, 14, 'second file has the set size');
  };

  this.render(hbs`<input class="target-element" type="file" multiple onchange={{onChange}} />`);
  selectFiles('.target-element', [
    new Blob(['texters'], { type: 'plain/text' }),
    new Blob(['images_texters'], { type: 'image/jpeg' })
  ]);
});

test('Ability to use the item method to grab files', function(assert) {
  assert.expect(5);
  this.onChange = (e) => {
    assert.equal(e.target.files.length, 2, 'files are present');
    assert.equal(e.target.files.item(0).type, 'plain/text', 'first file has the set type');
    assert.equal(e.target.files.item(0).size, 7, 'first file has the set size');
    assert.equal(e.target.files.item(1).type, 'image/jpeg', 'second file has the set type');
    assert.equal(e.target.files.item(1).size, 14, 'second file has the set size');
  };

  this.render(hbs`<input class="target-element" type="file" multiple onchange={{onChange}} />`);
  selectFiles('.target-element', [
    new Blob(['texters'], { type: 'plain/text' }),
    new Blob(['images_texters'], { type: 'image/jpeg' })
  ]);
});

test('Throws assertion if multiple files passed to a single file input', function(assert) {
  assert.expect(1);

  this.render(hbs`<input class="target-element" type="file" onchange={{onChange}} />`);

  assert.throws(function() {
    selectFiles('.target-element', [
      new Blob(['texters'], { type: 'plain/text' }),
      new Blob(['images_texters'], { type: 'image/jpeg' })
    ]);
  }, 'throws assertion if multiple files are passes to a non file input');
});

test('It does not add a file to a non file input', function(assert) {
  assert.expect(1);

  this.render(hbs`<input class="target-element" type="number" onchange={{onChange}} />`);

  assert.throws(function() {
    selectFiles('.target-element', [new Blob(['texters'], { type: 'plain/text' })]);
  }, 'throws assertion if used on a non file input element');
});

test('It accepts an HTMLElement as first argument', function(assert) {
  assert.expect(2);
  this.onChange = (e) => {
    assert.ok(true, 'a click event is fired');
    assert.ok(e instanceof window.Event, 'It receives a native event');
  };

  this.render(hbs`<input class="target-element" type="file" onchange={{onChange}} />`);
  selectFiles(document.querySelector('.target-element'), new Blob(['texters'], { type: 'plain/text' }));
});
