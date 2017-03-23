import Ember from 'ember';

Ember.deprecate(
  `Update imports for ember-native-dom-helpers to use:\n \`import { click, fillIn } from 'ember-native-dom-helpers';`,
  false,
  { id: 'ember-native-dom-helpers.test-support.helpers', until: '0.4.0' }
);

export { find } from '../find';
export { findAll } from '../find-all';
export { findWithAssert } from '../find-with-assert';
export { click } from '../click';
export { tap } from '../tap';
export { fillIn } from '../fill-in';
export { keyEvent } from '../key-event';
export { triggerEvent } from '../trigger-event';
export { visit } from '../visit';
export { waitUntil } from '../wait-until';
