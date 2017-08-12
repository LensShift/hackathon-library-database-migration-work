import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as firebase from 'firebase';
import { reactReduxFirebase } from 'react-redux-firebase';

import rootReducer, { initialState } from './reducers';
import App from './App';

import './index.css';

import { firebaseConfig, rrFirebase } from './config';

// initialize firebase instance
console.log('init app _', Date.now());
firebase.initializeApp(firebaseConfig, "bestapp") // <- new to v2.*.*
console.log('init app .', Date.now());

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, rrFirebase),
)(createStore);

console.log('create store frbe _', Date.now());
console.info(firebase);
const store = createStoreWithFirebase(rootReducer, initialState);
console.log('create store frbe .', Date.now());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
injectTapEventPlugin();
