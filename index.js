/**
 * @format
 */
import 'react-native-get-random-values';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (__DEV__) {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
      trackAllPureComponents: true,
      // optional verbose options
      logOnDifferentValues: true,
      collapseGroups: false,
    });
}
  
AppRegistry.registerComponent(appName, () => App);
