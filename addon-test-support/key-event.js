import { assign } from '@ember/polyfills';
import { triggerEvent } from './trigger-event';
import { deprecate } from '@ember/debug';

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
    'Importing `keyEvent` from "ember-native-dom-helpers" is deprecated. Since `ember-cli-qunit` 4.3 and `ember-cli-mocha` 0.15.0 you can use `import { triggerKeyEvent } from "@ember/test-helpers";`',
    false,
    { until: '0.7', id: 'ember-native-dom-helpers-key-event' }
  );
  return triggerEvent(selector, type, assign({ keyCode, which: keyCode, key: keyCode }, modifiers));
}
