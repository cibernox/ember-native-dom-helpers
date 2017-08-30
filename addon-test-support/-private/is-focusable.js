import isFormControl from './is-form-control';
import isContentEditable from './is-content-editable';

export default function isFocusable(el) {
  let focusableTags = ['LINK', 'A'];

  if (isFormControl(el) || isContentEditable(el) || focusableTags.indexOf(el.tagName) > -1) {
    return true;
  }

  return el.hasAttribute('tabindex');
}
