import { triggerEvent } from './trigger-event';

/*
  @method keyEvent
  @param {String|HTMLElement} selector
  @param {String} type
  @param {Number} keyCode
*/
export function keyEvent(selector, type, keyCode) {
  return triggerEvent(selector, type, { keyCode, which: keyCode });
}
