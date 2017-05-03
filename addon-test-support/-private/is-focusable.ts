const focusableTypes = [
  HTMLInputElement,
  HTMLButtonElement,
  HTMLLinkElement,
  HTMLSelectElement,
  HTMLAnchorElement,
  HTMLTextAreaElement
];
export default function isFocusable(el: HTMLElement) : boolean {
  if (el instanceof HTMLInputElement && el.type === 'hidden') {
    return false;
  }

  return focusableTypes.some((type) => el instanceof type) || el.contentEditable === 'true';
}
