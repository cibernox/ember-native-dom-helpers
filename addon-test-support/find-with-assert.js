import { find } from './find';

/*
  @method findWithAssert
  @param {String} CSS selector to find elements in the test DOM
  @param {HTMLElement} contextEl to query within, query from its contained DOM
  @return {Error|HTMLElement} element if found, or raises an error
  @public
*/
export function findWithAssert(selector, contextEl) {
  let el = find(selector, contextEl);
  if (el === null) {
    throw new Error(`Element ${selector} not found.`);
  } else {
    return el;
  }
}
