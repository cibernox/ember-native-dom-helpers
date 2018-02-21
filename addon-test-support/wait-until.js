import { run } from '@ember/runloop';
import RSVP from 'rsvp';
import { deprecate } from '@ember/debug';
import isNewTestingAPI from './-private/is-new-testing-api';

export function waitUntil(callback, { timeout = 1000 } = {}) {
  deprecate(
    'Importing `waitUntil` from "ember-native-dom-helpers" in the new testing API is deprecated. Since `ember-cli-qunit` 4.3 and `ember-cli-mocha` 0.15.0 you can use `import { waitUntil } from "@ember/test-helpers";`',
    !isNewTestingAPI(),
    { until: '0.7', id: 'ember-native-dom-helpers-wait-until' }
  );

  return new RSVP.Promise(function(resolve, reject) {
    let value = run(callback);
    if (value) {
      resolve(value);
      return;
    }
    let time = 0;
    let tick = function() {
      time += 10;
      let value = run(callback);
      if (value) {
        resolve(value);
      } else if (time < timeout) {
        setTimeout(tick, 10);
      } else {
        reject('waitUntil timed out');
      }
    };
    setTimeout(tick, 10);
  });
}
