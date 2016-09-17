import React, { Component } from 'react';
import firebase from 'firebase';
import BroadcastPlayer from './BroadcastPlayer';
import Chat from './Chat';

class VideoBroadcaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: {},
      broadcastRef: firebase.database().ref(`/broadcasts/${props.broadcastId}`)
    }
  }

  componentDidMount() {
    this.state.broadcastRef.on('value', snapshot => {
      const video = snapshot.val();
      this._setVideoState(video);
      this.setState({ video });
    });
  }

  _setVideoState({ videoId, time, state }) {
    if (this.player) {
      // sync time
      this.player.seekTo(time);
      // playing or buffering
      if (state === 1) {
        this.player.playVideo();
      } else {
        this.player.pauseVideo();
      }
    }
  }

  onReady({ target }) {
    this.player = target;
    this._setVideoState(this.state.video);
  }

  render() {
    const { video } = this.state;
    const opts = {
      width: '500',
      height: '300',
      frameBorder: '0',
      playerVars: {
        autoPlay: 0,
        controls: 0
      }
    };

    return (
      <div>
        <BroadcastPlayer
          video={video}
          broadcastId={this.props.broadcastId}
          opts={opts}
          onReady={e => this.onReady(e) }
          />
      </div>
    )
  }
}

export default VideoBroadcaster;
