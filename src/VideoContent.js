import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import YouTube from 'react-youtube';
import Chat from './Chat';
import ReactFireMixin from 'reactfire';
import firebase from 'firebase';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

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

const VideoContent = React.createClass({
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
            chatRef: firebase.database().ref(`/${this.props.collection}/${this.props.videoKey}/chat`),
        };
    },

    componentDidMount() {
        const videoRef = firebase.database().ref(`/${this.props.collection}/${this.props.videoKey}`);
        videoRef.once('value', snapshot => {
            const s = snapshot.val();
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
                    {
                        this.state.videoYouTubeId ? <YouTube
                            videoId={this.state.videoYouTubeId}
                            opts={this.props.opts}
                            onReady={this.props.onReady}
                            onStateChange={this.props.onStateChange}
                            /> : null
                    }
                </CardMedia>
                <CardTitle title="Comment" subtitle="What do you think about this video?" />
                <CardText>
                    <TextField hintText="Your comment" ref="messageText"/>
                </CardText>
                <CardActions>
                    <FlatButton onClick={this.postMessage} label="Add" />
                    {this.props.children}
                </CardActions>
                <List style={{ maxHeight: 300, overflow: 'scroll' }}>
                    {messages.map((message, index) => <ChatMessage key={index} {...message} />) }
                </List>
            </Card>
        )
    }
})

export default VideoContent;