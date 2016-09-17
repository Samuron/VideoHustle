import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import YouTube from 'react-youtube';
import Chat from './Chat';
import Toggle from 'material-ui/Toggle';
import ReactFireMixin from 'reactfire';
import firebase from 'firebase';

const FeedVideo = React.createClass({
    
  mixins: [ReactFireMixin],
  
  getInitialState() {
    return {
      videoYouTubeId: '',
      author: '',
      photoUrl: '',
      description: ''
    };
  },

  componentDidMount() {
    const videoRef = firebase.database().ref(`/videos/${this.props.videoKey}`);
    videoRef.once('value', snapshot => {
        const s = snapshot.val();
        console.log(s);
      this.setState(s);
    });
  },

  render() {  
      return (
          <Card>
              <CardHeader
                  title={this.state.author}
                  subtitle={this.state.description}
                  avatar={this.state.photoUrl}
                  />
              <CardMedia>
                  <YouTube
                      videoId={this.state.videoYouTubeId}
                      opts={this.props.opts}
                      />
              </CardMedia>
              <Chat videoKey={this.props.videoKey}/>
          </Card>
      )
    }
})

export default FeedVideo;