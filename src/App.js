import React, { Component } from 'react';
import firebase from 'firebase'
import { map } from 'lodash';
import { Link } from 'react-router';
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
//const App = React.createClass({
//  mixins: [ReactFireMixin],
//
//  getInitialState() {
//    return {
//      videoLink: '',
//      videos: {}
//    };
//  },
//
//  componentDidMount() {
//    const videosRef = firebase.database().ref('/videos');
//    this.bindAsArray(videosRef, 'videos')
//  },
//
//  addVideo( link ) {
//    this.videosRef.push({ link: link });
//  },
//
//  setValue( propName, value ) {
//    this.setState({
//      [propName]: value
//    })
//  },
//
//  openVideo( e, key ) {
//    e.preventDefault();
//    console.log( 'open video', key )
//  },
//
//  render() {
//    const { videos } = this.state;
//
//    return (
//      <div className=''>
//        {this.props.children}
//        <form onSubmit={ e => this.shareVideo() }>
//          <input type="text"
//                 onChange={ e => this.setValue( 'videoLink', e.target.values)} />
//          <button type="submit">Submit</button>
//        </form>
//        <h3>All videos</h3>
//        <ul>
//          {map(videos, video =>
//            (
//              <li key={video['.key']}>
//                <Link to={`/video/${video['.key']}`} >
//                  {video['.key']}
//                </Link>
//              </li>
//            )
//          )}
//        </ul>
//      </div>
//    );
//  }
// });


// export default App;
