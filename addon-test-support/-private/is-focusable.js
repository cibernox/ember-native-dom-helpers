export default function isFocusable(el) {
  let focusableTags = ['INPUT', 'BUTTON', 'LINK', 'SELECT', 'A', 'TEXTAREA'];
  let { tagName, type } = el;

  if (type === 'hidden') {
    return false;
  }

  return focusableTags.includes(tagName) || el.contentEditable;
}
