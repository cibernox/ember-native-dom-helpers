import { run } from '@ember/runloop';
import getElementWithAssert from './-private/get-element-with-assert';
import isFormControl from './-private/is-form-control';
import { focus } from './focus';
import { fireEvent } from './fire-event';
import wait from 'ember-test-helpers/wait';
import { deprecate } from '@ember/debug';
import isNewTestingAPI from './-private/is-new-testing-api';

/*
  @method fillIn
  @param {String|HTMLElement} selector
  @param {String} text
  @return {RSVP.Promise}
  @public
*/
export function fillIn(selector, text) {
  deprecate(
    'Importing `fillIn` from "ember-native-dom-helpers" in the new testing API is deprecated. Since `ember-cli-qunit` 4.3 and `ember-cli-mocha` 0.15.0 you can use `import { fillIn } from "@ember/test-helpers";`',
    !isNewTestingAPI(),
    { until: '0.7', id: 'ember-native-dom-helpers-fill-in' }
  );

  let el = getElementWithAssert(selector);

  if (!isFormControl(el) && !el.isContentEditable) {
    throw new Error('Unable to fill element');
  }

  run(() => focus(el));
  run(() => {
    if (el.isContentEditable) {
      el.innerHTML = text;
    } else {
      el.value = text;
    }
  });
  run(() => fireEvent(el, 'input'));
  run(() => fireEvent(el, 'change'));
  return (window.wait || wait)();
}
