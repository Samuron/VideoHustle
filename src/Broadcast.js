import React, { Component } from 'react';
import firebase from 'firebase';
import Chat from './Chat';
import VideoContent from './VideoContent';

const Broadcast = React.createClass({
  getInitialState() {
    var broadcastId = firebase.auth().currentUser.uid;
    return {
      video: {},
      broadcastId: broadcastId,
      broadcastRef: firebase.database().ref(`/broadcasts/${broadcastId}`)
    }
  },

  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    this.state.broadcastRef.once('value', snapshot => {
      this.setState({
        video: snapshot.val()
      });
    });
  },

  _setVideoState({ time, state }) {
    this.player.seekTo(time);
    // playing or buffering
    if (state === 1) {
      this.player.playVideo();
    } else {
      this.player.pauseVideo();
    }
  },

  onStateChange({ target, data }) {
    const video = {
      time: target.getCurrentTime(),
      // if state is buffering then set previous value
      state: data == 3 ? this.state.video : data
    };
    this.state.broadcastRef.update(video);

    console.log('state was changed:', video);
  },

  onReady({ target }) {
    this.player = target;
    this._setVideoState(this.state.video);
  },

  render() {
    const { video } = this.state;

    const opts = {
      width: '500',
      height: '300',
      frameBorder: '0',
      playerVars: {
        autoPlay: 0,
        controls: 1
      }
    };

    return (
      <div style={{ width: 500, margin: 'auto' }}>
        <VideoContent
          videoKey={this.state.broadcastId}
          collection="broadcasts"
          opts={opts}
          onReady={e => this.onReady(e) }
          onStateChange={e => this.onStateChange(e) }
          />
      </div>
    );
  }
});

export default Broadcast;
