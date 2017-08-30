export default function isFormControl(el) {
  let formControlTags = ['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA'];
  let { tagName, type } = el;

  if (type === 'hidden') {
    return false;
  }

  return formControlTags.indexOf(tagName) > -1;
}
