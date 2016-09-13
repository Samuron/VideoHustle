import React from 'react';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import Chat from './Chat';

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

    // console.log( 'key:', this.state.key );

    return (
      <div>
        <h3>Loading content for key: {this.state.key}</h3>
        <div>
          { video ?
            (
              <iframe id='ytplayer'
                      type='text/html'
                      width='640'
                      height='390'
                      src={video.link}
                      frameBorder='0' />
            ) : null }
        </div>
        <h3>Chat</h3>
        <Chat videoKey={this.state.key} />
      </div>
    )
  }
});

export default Video;
