import isFormControl from './is-form-control';

export default function isFocusable(el) {
  let focusableTags = ['LINK', 'A'];

  if (isFormControl(el) || el.isContentEditable || focusableTags.indexOf(el.tagName) > -1) {
    return true;
  }

  return el.hasAttribute('tabindex');
}
