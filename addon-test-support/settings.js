/*
  Options for use with test helpers, e.g. root element selector

  @class TestSupportSettings
*/
class TestSupportSettings {

  constructor(init = { rootElement: '#ember-testing', $: false}) {
    this._rootElement = init.rootElement;
    this._useJQueryWrapper = init.$;
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

  /*
    @public useJQueryWrapper
    @type Boolean
  */
  get useJQueryWrapper() {
    return this._useJQueryWrapper;
  }
  set useJQueryWrapper(value) {
    this._useJQueryWrapper = value;
  }
}

const settings = new TestSupportSettings();

export default settings;
