import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

import settings from 'ember-native-dom-helpers/test-support/settings';
import config from '../config/environment';
const { APP: { rootElement } } = config;

settings.rootElement = rootElement || settings.rootElement;
