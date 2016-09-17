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
    this.state.broadcastRef.once('value', snapshot => {
      this.setState({
        video: snapshot.val()
      });
    });
  }

  _setVideoState({ time, state }) {
    this.player.seekTo(time);
    // playing or buffering
    if (state === 1) {
      this.player.playVideo();
    } else {
      this.player.pauseVideo();
    }
  }

  onStateChange({ target, data }) {
    const video = {
      time: target.getCurrentTime(),
      // if state is buffering then set previous value
      state: data == 3 ? this.state.video : data
    };
    this.state.broadcastRef.update({...video});

  console.log( 'state was changed:', video );
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
      controls: 1
    }
  };

  return (
    <div>
      <BroadcastPlayer
        video={video}
        broadcastId={this.props.broadcastId}
        opts={opts}
        onReady={e => this.onReady(e) }
        onStateChange={e => this.onStateChange(e) }
        />
    </div>
  );
}
}

export default VideoBroadcaster;
