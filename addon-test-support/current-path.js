import { deprecate } from '@ember/debug';

export function currentPath() {
  deprecate(
    'Importing `currentPath` from "ember-native-dom-helpers" is deprecated. Since `ember-cli-qunit` 4.3 and `ember-cli-mocha` 0.15.0 you can use `import { currentPath } from "@ember/test-helpers";`',
    false,
    { until: '0.7', id: 'ember-native-dom-helpers-current-path' }
  );
  if (!window.currentPath) {
    throw new Error('currentPath is only available during acceptance tests');
  }

  return window.currentPath(...arguments);
}
