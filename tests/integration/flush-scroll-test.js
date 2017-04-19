import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, flushScrollAndWait } from 'ember-native-dom-helpers';

moduleForComponent('flush-scroll', 'Integration | Test Helper | flushScroll', {
  integration: true
});

test('Scroll is async, but is triggered by a `flushScrollAndWait`', async function(assert) {
  let val = false;
  this.callback = () => val = true;

  this.render(hbs`
    <style>
       .container {
         height: 200px;
         overflow-y: auto;
       }
       .item {
         height: 100px;
       }
    </style>
  
    <div class="container" onscroll={{action callback}}>
      <ul>
      <li class="item">A</li>
      <li class="item">B</li>
      <li class="item">C</li>
      <li class="item">D</li>
      <li class="item">E</li>
      </ul>
    </div>
    `);

  find('.container').scrollTop = 50;
  assert.notOk(val, 'Value is aync so the scroll event hasnt been emitted');

  await flushScrollAndWait();

  assert.ok(val, 'After use of the `flushScrollAndWait` a paint cycle is triggered and the callback is called');
});
