import React from 'react';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';

const Video = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      key: this.props.params.key,
      video: null
    };
  },

  componentDidMount() {
    const videoRef = firebase.database().ref( `/videos/${this.state.key}`);
    this.bindAsObject(videoRef, 'video')
  },

  render() {
    const { video } = this.state;

    console.log( 'video:', video );

    return (
      <div>
        <h3>Loading content for key: {this.state.key}</h3>
        <div>
          {video ? <span>YouTube Link:  {video.link}</span> : null }
        </div>
      </div>
    )
  }
});

export default Video;
