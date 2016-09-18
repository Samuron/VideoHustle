import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import YouTube from 'react-youtube';
import Chat from './Chat';
import Toggle from 'material-ui/Toggle';
import ReactFireMixin from 'reactfire';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import VideoContent from './VideoContent';

const FeedVideo = React.createClass({
    mixins: [ReactFireMixin],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            open: false,
            chatRef: firebase.database().ref(`/chats/${this.props.videoKey}`),
        };
    },

    broadcast() {
        var brRef = firebase.database().ref('/broadcasts/' + firebase.auth().currentUser.uid);
        console.log('state:', this.state);
        firebase.database().ref('/videos/' + this.props.videoKey).once('value', snapshot => {
            var videoSnapshot = snapshot.val();
            var inserted = brRef.update({
                videoYouTubeId: videoSnapshot.videoYouTubeId,
                state: 0,
                time: 0.0,
                author: videoSnapshot.author,
                photoUrl: videoSnapshot.photoUrl,
                description: videoSnapshot.description
            });
            this.context.router.push('/broadcast');
        });
    },

    render() {
        const opts = {
            width: '500',
            height: '300',
            frameBorder: '0'
        };

        return (
            <VideoContent collection="videos" videoKey={this.props.videoKey} opts={opts}>
                <Snackbar open={this.state.open}
                    message="Your comment was added"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose} />
                <RaisedButton onClick={this.broadcast} label="Broadcast" />
            </VideoContent>
        )
    }
})

export default FeedVideo;