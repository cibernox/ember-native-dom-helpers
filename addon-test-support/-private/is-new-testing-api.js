import require from 'require';

let hasNewTestHelpers = require.has('@ember/test-helpers');

export default function() {
  if (hasNewTestHelpers) {
    let { getContext } = require('@ember/test-helpers');
    return !!getContext();
  }
  return false;
}
