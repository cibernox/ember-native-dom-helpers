import getElementWithAssert from './-private/get-element-with-assert';

/*
  @method findWithAssert
  @param {String} CSS selector to find elements in the test DOM
  @param {HTMLElement} contextEl to query within, query from its contained DOM
  @return {Error|HTMLElement} element if found, or raises an error
  @public
*/
export function findWithAssert(selector, contextEl) {
  return getElementWithAssert(selector, contextEl);
}
