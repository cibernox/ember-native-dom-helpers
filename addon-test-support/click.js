import { run } from '@ember/runloop';
import getElementWithAssert from './-private/get-element-with-assert';
import { fireEvent } from './fire-event';
import { focus } from './focus';
import wait from 'ember-test-helpers/wait';
import { deprecate } from '@ember/debug';
import isNewTestingAPI from './-private/is-new-testing-api';
/*
  @method clickEventSequence
  @private
*/
export function clickEventSequence(el, options) {
  run(() => fireEvent(el, 'mousedown', options));
  focus(el);
  run(() => fireEvent(el, 'mouseup', options));
  run(() => fireEvent(el, 'click', options));
}

/*
  @method click
  @param {String|HTMLElement} selector
  @param {HTMLElement} context
  @param {Object} options
  @return {RSVP.Promise}
  @public
*/
export function click(selector, context, options) {
  deprecate(
    'Importing `click` from "ember-native-dom-helpers" in the new testing API is deprecated. Since `ember-cli-qunit` 4.3 and `ember-cli-mocha` 0.15.0 you can use `import { click } from "@ember/test-helpers";`',
    !isNewTestingAPI(),
    { until: '0.7', id: 'ember-native-dom-helpers-click' }
  );
  let element;
  if (context instanceof HTMLElement) {
    element = getElementWithAssert(selector, context);
  } else {
    options = context || {};
    element = getElementWithAssert(selector);
  }
  clickEventSequence(element, options);
  return (window.wait || wait)();
}
