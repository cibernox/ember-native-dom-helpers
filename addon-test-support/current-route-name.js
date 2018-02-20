import { deprecate } from '@ember/debug';

export function currentRouteName() {
  deprecate(
    'Importing `currentRouteName` from "ember-native-dom-helpers" is deprecated. Since `ember-cli-qunit` 4.3 and `ember-cli-mocha` 0.15.0 you can use `import { currentRouteName } from "@ember/test-helpers";`',
    false,
    { until: '0.7', id: 'ember-native-dom-helpers-current-route-name' }
  );
  if (!window.currentRouteName) {
    throw new Error('currentRouteName is only available during acceptance tests');
  }

  return window.currentRouteName(...arguments);
}
