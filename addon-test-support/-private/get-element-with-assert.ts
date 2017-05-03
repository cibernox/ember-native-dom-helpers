import getElement from './get-element';
import { ElementOrSelector } from './types';

export default function getElementWithAssert(selectorOrElement: ElementOrSelector, contextEl: ElementOrSelector) : HTMLElement {
  let el = getElement(selectorOrElement, contextEl);
  if (el) {
    return el;
  }
  throw new Error(`Element ${selectorOrElement} not found.`);
}
