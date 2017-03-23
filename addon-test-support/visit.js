export function visit() {
  if (!window.visit) {
    throw new Error('visit is only available during acceptance tests');
  }

  return window.visit(...arguments);
}
