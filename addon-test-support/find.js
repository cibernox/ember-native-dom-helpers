import settings from 'ember-native-dom-helpers/test-support/settings';

/*
  The find test helper uses `querySelector` to search inside the test
  DOM (based on app configuration for the rootElement).

  Alternalively, a second argument may be passed which is an element as the
  DOM context to search within.

  @method find
  @param {String} CSS selector to find one or more elements in the test DOM
  @param {HTMLElement} contextEl to query within, query from its contained DOM
  @return {null|HTMLElement} null or an element
  @public
*/
export function find(selector, contextEl) {
  let result;
  if (contextEl instanceof HTMLElement) {
    result = contextEl.querySelector(selector);
  } else {
    result = document.querySelector(`${settings.rootElement} ${selector}`);
  }
  return result;
}
