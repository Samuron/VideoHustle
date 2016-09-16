import React, { Component } from 'react';
import firebase from 'firebase';
import YouTube from './VideoContent';
import Chat from './Chat';

class VideoBroadcaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: props.videoKey,
      video: {},
      videoRef: firebase.database().ref(`/videos/${props.videoKey}`)
    }
  }

  componentDidMount() {
    const videoRef = this.state.videoRef;

    videoRef.on( 'value', snapshot => {
      const video = snapshot.val();
      this._setVideoState(video);
      this.setState({ video });
    });
  }

  _setVideoState({ time, state }) {
    if ( this.player ) {
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
        { video.link ?
          (
            <YouTube
              link={video.link}
              opts={opts}
              onReady={e => this.onReady(e)}
            />
          ) : null
        }
      </div>
    )
  }
}

export default VideoBroadcaster;
