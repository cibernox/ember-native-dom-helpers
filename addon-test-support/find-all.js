import settings from './settings';

/*
  The findAll test helper uses `querySelectorAll` to search inside the test
  DOM (based on app configuration for the rootElement).

  Alternalively, a second argument may be passed which is an element as the
  DOM context to search within.

  @method findAll
  @param {String} CSS selector to find elements in the test DOM
  @param {HTMLElement} contextEl to query within, query from its contained DOM
  @return {NodeList} A (non-live) list of zero or more HTMLElement objects
  @public
*/
export function findAll(selector, contextEl) {
  let result;
  if (contextEl instanceof HTMLElement) {
    result = contextEl.querySelectorAll(selector);
  } else {
    result = document.querySelectorAll(`${settings.rootElement} ${selector}`);
  }
  return result;
}
