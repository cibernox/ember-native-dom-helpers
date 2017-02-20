/*
  Options for use with test helpers, e.g. root element selector

  @class TestSupportSettings
*/
class TestSupportSettings {
  constructor(init = { rootElement: '#ember-testing'}) {
    this._rootElement = init.rootElement;
  }
  get rootElement() {
    return this._rootElement;
  }
  set rootElement(value) {
    this._rootElement = value;
  }
}

const settings = new TestSupportSettings();

export default settings;
