import { run } from '@ember/runloop';
import { assert } from '@ember/debug';
import { isArray } from '@ember/array';
import getElementWithAssert from './-private/get-element-with-assert';
import { fireEvent } from './fire-event';
import wait from 'ember-test-helpers/wait';

/*
  @method selectFiles
  @param {String|HTMLElement} selector
  @param {Array} flies
  @return {RSVP.Promise}
  @public
*/
export function selectFiles(selector, files = []) {
  let element = getElementWithAssert(selector);

  assert(`This is only used with file inputs.
          Either change to a 'type="file"' or use the 'triggerEvent' helper.`,
          element.type === 'file');

  if (!isArray(files)) {
    files = [files];
  }

  assert(`Can only handle multiple slection when an input is set to allow for multiple files.
          Please add the property "multiple" to your file input.`,
          element.multiple || files.length <= 1);

  run(() => fireEvent(element, 'change', files));
  return (window.wait || wait)();
}
