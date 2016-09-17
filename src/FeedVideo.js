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

const ChatMessage = ({ time, name, message, photoUrl}) => {
    var timestamp = new Date(time);
    var secondaryText = <p><span style={{ color: darkBlack }}>{timestamp.toDateString() }</span> by {name}</p>;
    var avatar = <Avatar src={photoUrl} />;
    return (
        <div>
            <ListItem leftAvatar={avatar} primaryText={message} secondaryText={secondaryText}/>
            <Divider inset={true} />
        </div>
    );
};

const FeedVideo = React.createClass({
    mixins: [ReactFireMixin],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            videoYouTubeId: '',
            author: '',
            photoUrl: '',
            description: '',
            messages: [],
            open: false,
            chatRef: firebase.database().ref(`/chats/${this.props.videoKey}`),
        };
    },

    componentDidMount() {
        const videoRef = firebase.database().ref(`/videos/${this.props.videoKey}`);
        videoRef.once('value', snapshot => {
            const s = snapshot.val();
            console.log(s);
            this.setState(s);
        });
        this.bindAsArray(this.state.chatRef.orderByChild('time').limitToFirst(100), 'messages');
    },

    postMessage() {
        this.state.chatRef.push({
            time: firebase.database.ServerValue.TIMESTAMP,
            message: this.refs.messageText.getValue(),
            name: this.state.author,
            photoUrl: this.state.photoUrl,
        });
        this.setState({ message: '', open: true });
    },

    broadcast() {
        var brRef = firebase.database().ref('/broadcasts');
        var inserted = brRef.push({
            videoId: this.state.videoYouTubeId,
            state: 0,
            time: 0.0,
            broadcaster: this.state.author,
            photoUrl: this.state.photoUrl,
            description: this.state.description
        });
        this.context.router.push('/broadcast/' + inserted.getKey());
    },

    render() {
        var messages = this.state.messages.slice(0).reverse();
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
                        onReady={this.props.onReady}
                        onStateChange={this.props.onStateChange}
                        />
                </CardMedia>
                <CardTitle title="Comment" subtitle="What do you think about this video?" />
                <CardText>
                    <TextField hintText="Your comment" ref="messageText"/>
                </CardText>
                <CardActions>
                    <RaisedButton onClick={this.postMessage} label="Add" />
                    <Snackbar open={this.state.open}
                        message="Your comment was added"
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose} />
                    <RaisedButton onClick={this.broadcast} label="Broadcast" />
                </CardActions>
                <List style={{ maxHeight: 300, overflow: 'scroll' }}>
                    {messages.map((message, index) => <ChatMessage key={index} {...message} />) }
                </List>
            </Card>
        )
    }
})

export default FeedVideo;