import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { click } from 'ember-native-dom-helpers';
import hbs from 'htmlbars-inline-precompile';
import { registerDeprecationHandler } from '@ember/debug';

module('Acceptance | usage in new testing api', function(hooks) {
  setupRenderingTest(hooks);

  test('`click` raises a deprecation message', async function(assert) {
    let done = assert.async();
    await render(hbs`<div class="the-target"></div>`);
    registerDeprecationHandler(function(msg) {
      assert.equal(msg, 'Importing `click` from "ember-native-dom-helpers" in the new testing API is deprecated. Since `ember-cli-qunit` 4.3 and `ember-cli-mocha` 0.15.0 you can use `import { click } from "@ember/test-helpers";`');
      done();
    });
    await click('.the-target');
  });
});
