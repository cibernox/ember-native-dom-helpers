export default function isFocusable(el) {
  let focusableTags = ['INPUT', 'BUTTON', 'LINK', 'SELECT', 'A', 'TEXTAREA'];
  let { tagName, type } = el;

  if (type === 'hidden') {
    return false;
  }
  if (focusableTags.indexOf(tagName) > -1 || el.contentEditable === 'true') {
    return true;
  }
  return el.attributes.hasOwnProperty('tabindex');
}
