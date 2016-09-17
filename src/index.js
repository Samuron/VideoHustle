import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './App';
import Broadcast from './Broadcast';
import Home from './Home';
import Login from './Login';
import Feed from './Feed';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDKA3OrAAbhLWV-oILlook7z9orkGRO-KQ",
  authDomain: "videohustle-d80dd.firebaseapp.com",
  databaseURL: "https://videohustle-d80dd.firebaseio.com",
  storageBucket: "videohustle-d80dd.appspot.com"
};

firebase.initializeApp(FIREBASE_CONFIG);

const checkToken = (nextState, replace, next) => {
  firebase.auth().onAuthStateChanged( user => {
    if ( !user ) {
      replace('/login');
      next();
    } else {
      next();
    }
  });
};

const Navigation = (
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/" component={App} onEnter={checkToken}>
        <IndexRoute component={Feed} />
        <Route path="/broadcast/:key" component={Broadcast} />
      </Route>
      <Route path="/login" component={Login} />

    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(Navigation, document.getElementById('root'));
