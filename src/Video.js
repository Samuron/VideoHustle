import React from 'react';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import Chat from './Chat';
import YouTube from 'react-youtube';

const Video = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      key: this.props.params.key,
      video: null,
      videoRef: firebase.database().ref(`/videos/${this.props.params.key}`)
    };
  },

  componentDidMount() {
    const videoRef = this.state.videoRef;
    this.bindAsObject(videoRef, 'video');
  },

  componentDidUpdate(pastProps, pastState) {
    console.log('component updated');
    console.log('prevState:', pastState.video);
    console.log('state:', this.state.video);
    if (pastState.video.state != this.state.video.state) {
      console.log('handling update');
      this.handleVideoState();
    }
  },

  handleVideoState() {
    var player = this.state.player;
    var time = this.state.video.time;
    var state = this.state.video.state;
    console.log('time:', time);
    console.log('state:', state);

    if (time)
      player.seekTo(time, true);

    if (state === 'play') {
      console.log('start playing');
      player.playVideo();
    }
    else {
      console.log('pause playing');
      player.pauseVideo();
    }
  },

  playerReady(event) {
    this.setState({ player: event.target });
    this.handleVideoState();
  },

  playerPlay(event) {
    console.log('player play command');
    var updated = {
      state: 'play',
      time: event.target.getCurrentTime()
    };
    this.state.videoRef.update(updated);
  },

  playerPause(event) {
    console.log('player pause command');
    var updated = {
      state: 'pause',
      time: event.target.getCurrentTime()
    };
    console.log(updated);
    this.state.videoRef.update(updated);
  },

  render() {
    const { video } = this.state;

    // console.log( 'key:', this.state.key );
    const opts = {
      width: '640',
      height: '390',
      frameBorder: '0',
    };

    return (
      <div>
        <h3>Loading content for key: {this.state.key}</h3>
        <div>
          { video ?
            (
              <YouTube
                videoId = {video.link.substr(video.link.lastIndexOf('/') + 1) }
                opts = {opts}
                onReady ={this.playerReady}
                onPlay ={this.playerPlay}
                onPause={this.playerPause}/>
            ) : null }
        </div>
        <h3>Chat</h3>
        <Chat videoKey={this.state.key} />
      </div>
    )
  }
});

export default Video;
