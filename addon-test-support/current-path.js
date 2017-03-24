export function currentPath() {
  if (!window.currentPath) {
    throw new Error('currentPath is only available during acceptance tests');
  }

  return window.currentPath(...arguments);
}
