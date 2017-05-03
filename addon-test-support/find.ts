import getElement from './-private/get-element';
import { ElementOrSelector } from './-private/types';
/*
  The find test helper uses `querySelector` to search inside the test
  DOM (based on app configuration for the rootElement).

  Alternalively, a second argument may be passed which is an element as the
  DOM context to search within.

  @method find
  @public
*/
export function find(selector: ElementOrSelector, contextEl: ElementOrSelector) : ElementOrSelector {
  return getElement(selector, contextEl);
}
