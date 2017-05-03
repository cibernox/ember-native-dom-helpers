import settings from '../settings';
import { ElementOrSelector } from './types';

export default function getElement(selectorOrElement: ElementOrSelector, contextEl: ElementOrSelector) : HTMLElement {
  if (selectorOrElement instanceof HTMLElement) {
    return selectorOrElement;
  }
  let result: HTMLElement;
  if (contextEl instanceof HTMLElement) {
    result = contextEl.querySelector(selectorOrElement);
  } else {
    result = document.querySelector(`${settings.rootElement} ${selectorOrElement}`);
  }
  return result;
}
