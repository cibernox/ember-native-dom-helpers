import Component from '@ember/component';
import { set, get } from '@ember/object';

export default Component.extend({
  tagName: 'form',

  agreed: false,

  inputValue: '',

  isChecked: false,

  message: '',

  selectedValue: '',

  textareaValue: '',

  actions: {
    showTerms() {
      this.element.querySelector('.terms-hidden').classList.remove('terms-hidden');
    },
    agree() {
      set(this, 'agreed', true);
    },
    selected(evt) {
      set(this, 'selectedValue', evt.target.value);
      get(this, 'onSelect')(evt.target.value);
    },
    submit() {
      this.submit();
    }
  },

  keyUp(evt) {
    if (evt.keyCode === 13) {
      this.submit(evt);
    }
  },

  submit() {
    if (get(this, 'agreed')) {
      set(this, 'message', 'All your base are mine');
    } else {
      set(this, 'message', 'you must agree to my terms');
    }
  }
});
