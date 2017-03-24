export function currentURL() {
  if (!window.currentURL) {
    throw new Error('currentURL is only available during acceptance tests');
  }

  return window.currentURL(...arguments);
}
