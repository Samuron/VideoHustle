import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import YouTube from 'react-youtube';
import ReactFireMixin from 'reactfire';
import firebase from 'firebase';
import Snackbar from 'material-ui/Snackbar';
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
        var user =  firebase.auth().currentUser;
        var brRef = firebase.database().ref('/broadcasts/' + user.uid);
        console.log('state:', this.state);
        firebase.database().ref('/videos/' + this.props.videoKey).once('value', snapshot => {
            var videoSnapshot = snapshot.val();
            var inserted = brRef.update({
                videoYouTubeId: videoSnapshot.videoYouTubeId,
                state: -1,
                time: 0.0,
                author: user.displayName,
                photoUrl: user.photoURL,
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
                <FlatButton onClick={this.broadcast} label="Broadcast" />
            </VideoContent>
        )
    }
})

export default FeedVideo;