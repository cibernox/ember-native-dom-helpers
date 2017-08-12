import { merge } from '@ember/polyfills';
import { triggerEvent } from './trigger-event';

/**
 * @public
 * @param selector
 * @param type
 * @param keyCode
 * @param modifiers
 * @return {*}
 */
export function keyEvent(selector, type, keyCode, modifiers = { ctrlKey: false, altKey: false, shiftKey: false, metaKey: false }) {
  return triggerEvent(selector, type, merge({ keyCode, which: keyCode, key: keyCode }, modifiers));
}
