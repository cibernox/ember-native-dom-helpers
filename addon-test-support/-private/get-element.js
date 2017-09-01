import settings from '../settings';

/*
  @method getElement
  @param {String|HTMLElement} selectorOrElement
  @param {HTMLElement} contextEl to query within, query from its contained DOM
  @return HTMLElement
  @private
*/
export default function getElement(selectorOrElement, context) {
  if (selectorOrElement instanceof Window ||
    selectorOrElement instanceof Document ||
    selectorOrElement instanceof HTMLElement ||
    selectorOrElement instanceof SVGElement) {
    return selectorOrElement;
  }
  let result;
  if (context instanceof HTMLElement) {
    result = context.querySelector(selectorOrElement);
  } else if (typeof context === 'string') {
    result = document.querySelector(`${settings.rootElement} ${context} ${selectorOrElement}`);
  } else {
    result = document.querySelector(`${settings.rootElement} ${selectorOrElement}`);
  }
  return result;
}
