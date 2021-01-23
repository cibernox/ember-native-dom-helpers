import { run } from '@ember/runloop';
import RSVP from 'rsvp';
import { deprecate } from '@ember/debug';

export function waitUntil(callback, { timeout = 1000 } = {}) {
  deprecate(
    'Importing `waitUntil` from "ember-native-dom-helpers" is deprecated. Since `ember-cli-qunit` 4.3 and `ember-cli-mocha` 0.15.0 you can use `import { waitUntil } from "@ember/test-helpers";`',
    false,
    { until: '0.7', id: 'ember-native-dom-helpers-wait-until' }
  );

  return new RSVP.Promise(function(resolve, reject) {
    let time = 0;
    function tick() {
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
