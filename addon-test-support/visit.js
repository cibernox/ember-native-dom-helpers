import { deprecate } from '@ember/debug';

export function visit() {
  deprecate(
    'Importing `visit` from "ember-native-dom-helpers" is deprecated. Since `ember-cli-qunit` 4.3 and `ember-cli-mocha` 0.15.0 you can use `import { visit } from "@ember/test-helpers";`',
    false,
    { until: '0.7', id: 'ember-native-dom-helpers-visit' }
  );

  if (!window.visit) {
    throw new Error('visit is only available during acceptance tests');
  }

  return window.visit(...arguments);
}
