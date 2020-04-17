import React from 'react';
import thunk from 'redux-thunk';
import * as firebase from 'firebase';
import _ from 'lodash';
import { YellowBox } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import rootReducer from './store/reducer/';
import { firebaseConfig } from './config/firebase.config';

const composeEnhancers = compose;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1DA1F2',
    accent: '#ffffff',
    background: '#ffffff',
  },
};

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = (message: any) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}
//Test commit
