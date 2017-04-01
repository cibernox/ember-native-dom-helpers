import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';
import { start } from 'ember-cli-qunit';
import { settings } from 'ember-native-dom-helpers';
import config from '../config/environment';

setResolver(resolver);
const { APP: { rootElement } } = config;
settings.rootElement = rootElement || settings.rootElement;
start();
