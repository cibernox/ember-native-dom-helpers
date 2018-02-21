import { merge } from '@ember/polyfills';
import { triggerEvent } from './trigger-event';
import { deprecate } from '@ember/debug';
import isNewTestingAPI from './-private/is-new-testing-api';

/**
 * @public
 * @param selector
 * @param type
 * @param keyCode
 * @param modifiers
 * @return {*}
 */
export function keyEvent(selector, type, keyCode, modifiers = { ctrlKey: false, altKey: false, shiftKey: false, metaKey: false }) {
  deprecate(
    'Importing `keyEvent` from "ember-native-dom-helpers" in the new testing API is deprecated. Since `ember-cli-qunit` 4.3 and `ember-cli-mocha` 0.15.0 you can use `import { triggerKeyEvent } from "@ember/test-helpers";`',
    !isNewTestingAPI(),
    { until: '0.7', id: 'ember-native-dom-helpers-key-event' }
  );
  return triggerEvent(selector, type, merge({ keyCode, which: keyCode, key: keyCode }, modifiers));
}
