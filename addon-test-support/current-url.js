import { deprecate } from '@ember/debug';

export function currentURL() {
  deprecate(
    'Importing `currentURL` from "ember-native-dom-helpers" is deprecated. Since `ember-cli-qunit` 4.3 and `ember-cli-mocha` 0.15.0 you can use `import { currentURL } from "@ember/test-helpers";`',
    false,
    { until: '0.7', id: 'ember-native-dom-helpers-current-url' }
  );
  if (!window.currentURL) {
    throw new Error('currentURL is only available during acceptance tests');
  }

  return window.currentURL(...arguments);
}
