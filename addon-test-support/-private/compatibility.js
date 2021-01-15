//
// This is a wrapper around `@ember/test-helpers` that we need for compatibility
// reasons. Apps and addons using ember-qunit v4 aren't supposed to depend directly on
// `@ember/test-helpers` and just use the one that their version of
// `ember-qunit` or `ember-mocha` provides.
// Apps and addons using ember-qunit v5 directly depend on
// `@ember/test-helpers`.
const { require } = window;

let waitFn;

if (require.has('ember-test-helpers/wait')) {
  // This is implemented as a function that calls `ember-test-helpers/wait`
  // rather than just assigning `helpers.wait = require(...).default` because
  // since this code executes while modules are initially loading, under certain
  // conditions `ember-test-helpers/wait` can still be in the pending state
  // at this point, so its exports are still undefined.
  waitFn = (...args) => require('ember-test-helpers/wait').default(...args);
} else if (require.has('@ember-test/helpers')) {
  waitFn = (...args) => require('@ember-test/helpers').wait(...args);
}

export let wait = waitFn;
