/*
  Options for use with test helpers, e.g. root element selector

  @class TestSupportSettings
*/
class TestSupportSettings {

  constructor(init = { rootElement: '#ember-testing' }) {
    this._rootElement = init.rootElement;
  }

  /*
    Setting for Ember app root element, default is #ember-testing

    @public rootElement
    @type String
  */
  get rootElement() {
    return this._rootElement;
  }
  set rootElement(value) {
    this._rootElement = value;
  }
}

const settings = new TestSupportSettings();

export default settings;
