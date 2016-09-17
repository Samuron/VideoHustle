import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './App';
import Video from './Video';
import Home from './Home';
import Login from './Login';

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
        <IndexRoute component={Home} />
        <Route path="/video/:key" component={Video} />
      </Route>
      <Route path="/login" component={Login} />
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(Navigation, document.getElementById('root'));
