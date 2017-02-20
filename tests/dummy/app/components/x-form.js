import Ember from 'ember';

export default Ember.Component.extend({
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
      this.set('agreed', true);
    },
    selected(evt) {
      this.set('selectedValue', evt.target.value);
      this.get('onSelect')(evt.target.value);
    },
    submit() {
      this.submit()
    }
  },

  keyUp(evt) {
    if (evt.keyCode === 13) {
      this.submit(evt);
    }
  },

  submit() {
    if (this.get('agreed')) {
      this.set('message', 'All your base are mine');
    } else {
      this.set('message', 'you must agree to my terms');
    }
  }
});
