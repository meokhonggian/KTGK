/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const PORT = process.env.PORT || 8081;
AppRegistry.registerComponent(appName, () => App);
