import { deprecate } from '@ember/debug';
import isNewTestingAPI from './-private/is-new-testing-api';

export function currentPath() {
  deprecate(
    'Importing `currentPath` from "ember-native-dom-helpers" in the new testing API is deprecated. Since `ember-cli-qunit` 4.3 and `ember-cli-mocha` 0.15.0 you can use `import { currentPath } from "@ember/test-helpers";`',
    !isNewTestingAPI(),
    { until: '0.7', id: 'ember-native-dom-helpers-current-path' }
  );
  if (!window.currentPath) {
    throw new Error('currentPath is only available during acceptance tests');
  }

  return window.currentPath(...arguments);
}
