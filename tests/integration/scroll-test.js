import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { scrollTo } from 'ember-native-dom-helpers';

moduleForComponent('scrollTo', 'Integration | Test Helper | scrollTo', {
  integration: true
});

test('Scroll in vertical direction is async, not a problem', async function(assert) {
  let currentScrollPosition = 0;
  let scrollAmount = 50;
  this.callback = (e) => {
    currentScrollPosition = e.target.scrollTop;
  };

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

  await scrollTo('.container', 0, scrollAmount);

  assert.equal(currentScrollPosition, scrollAmount, 'After use of the `scrollTop` a paint cycle is triggered and the callback is called');
});

test('Scroll in horizontal direction is async, not a problem', async function(assert) {
  let currentScrollPosition = 0;
  let scrollAmount = 50;
  this.callback = (e) => {
    currentScrollPosition = e.target.scrollLeft;
  };

  this.render(hbs`
    <style>
       .container {
         width: 200px;
         overflow-x: auto;
         white-space: nowrap;
       }
       .item {
         width: 100px;
         height: 100px;
         display: inline-block;
       }
    </style>

    <div class="container" onscroll={{action callback}}>
      <div class="item">A</div>
      <div class="item">B</div>
      <div class="item">C</div>
      <div class="item">D</div>
      <div class="item">E</div>
    </div>
    `);

  await scrollTo('.container', scrollAmount, 0);

  assert.equal(currentScrollPosition, scrollAmount, 'After use of the `scrollLeft` a paint cycle is triggered and the callback is called');
});

test('Scroll on window works', async function(assert) {
  this.render(hbs`
    <style>
       html, body {
         height: 200vh;
         overflow-y: auto;
         width: 100vw;
       }
    </style>
    `);

  await scrollTo(window, 0, 100);

  assert.equal(window.scrollY, 100, 'scrollTo scrolls window the appropriate amount');
});
