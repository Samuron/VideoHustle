import React, { Component } from 'react';
import firebase from 'firebase'
import ReactFireMixin from 'reactfire';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDKA3OrAAbhLWV-oILlook7z9orkGRO-KQ",
  authDomain: "videohustle-d80dd.firebaseapp.com",
  databaseURL: "https://videohustle-d80dd.firebaseio.com",
  storageBucket: "videohustle-d80dd.appspot.com"
};

firebase.initializeApp(FIREBASE_CONFIG);

export default class App extends Component {
  render() {
    return this.props.children;
  }
}
