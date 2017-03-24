export function currentRouteName() {
  if (!window.currentRouteName) {
    throw new Error('currentRouteName is only available during acceptance tests');
  }

  return window.currentRouteName(...arguments);
}
