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
    if (pastState.video.state != this.state.video.state)
      this.handleVideoState();
  },

  handleVideoState() {
    var player = this.state.player;
    var time = this.state.video.time;
    var state = this.state.video.state;

    if (time)
      player.seekTo(time);
    if (state == 'play')
      player.playVideo();
    else
      player.pauseVideo();

  },

  playerReady(event) {
    this.setState({ player: event.target });
    this.handleVideoState();
  },

  playerPlay(event) {
    this.state.videoRef.update({ state: 'play', });
    this.updateTime();
  },

  updateTime() {
    if (this.state.video.state == 'play') {
      var updated = {
        time: this.state.player.getCurrentTime()
      };
      this.state.videoRef.update(updated);
    }
    setTimeout(this.updateTime, 1000);
  },

  playerPause(event) {
    var updated = {
      state: 'pause',
      time: this.state.player.getCurrentTime()
    };
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
