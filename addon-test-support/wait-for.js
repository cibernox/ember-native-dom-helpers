import { waitUntil } from './wait-until';
import { find } from './find';
import { findAll } from './find-all';

export function waitFor(selector, { timeout = 1000, count = null } = {}) {
  let callback;
  if (count) {
    callback = () => {
      let elements = findAll(selector);
      if (elements.length === count) {
        return elements;
      }
    };
  } else {
    callback = () => find(selector);
  }
  return waitUntil(callback, { timeout });
}
