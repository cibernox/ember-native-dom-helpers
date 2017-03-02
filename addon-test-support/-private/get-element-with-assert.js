import getElement from './get-element';

/*
  @method getElementWithAssert
  @param {String|HTMLElement} selectorOrElement
  @param {HTMLElement} contextEl to query within, query from its contained DOM
  @return {Error|HTMLElement} element if found, or raises an error
  @private
*/
export default function getElementWithAssert(selectorOrElement, contextEl) {
  let el = getElement(selectorOrElement, contextEl);
  if (el) {
    return el;
  }
  throw new Error(`Element ${selectorOrElement} not found.`);
}
