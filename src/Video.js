import React from 'react';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';

const Video = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      videos: []
    };
  },

  componentDidMount() {
    // TODO: get video by key from URL params
    const videosRef = firebase.database().ref('/videos');

    this.bindAsArray(videosRef, 'videos')
  },

  render() {
    // const { videos } = this.state;
    // console.log( 'render video', videos );
    return (
      <div>Single video</div>
    )
  }
});

export default Video;
