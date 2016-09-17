import React from 'react';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

const ChatMessage = ({ time, name, message, photoUrl}) => {
  var timestamp = new Date(time);
  var secondaryText = <p><span style={{ color: darkBlack }}>{timestamp.toDateString()}</span> by {name}</p>;
  var avatar = <Avatar src={photoUrl} />;
  return (
    <div>
      <ListItem leftAvatar={avatar} primaryText={message} secondaryText={secondaryText}/>
      <Divider inset={true} />
    </div>
  );
};

const style = {
  width: 500,
  height: 300,
  overflow: 'scroll'
}
const Chat = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState() {
    var user = firebase.auth().currentUser;
    console.log(user.photoURL);
    return {
      messages: [],
      message: '',
      open: false,
      chatRef: firebase.database().ref(`/broadcasts/${this.props.broadcastId}/chat`),
      name: user.displayName,
      photoUrl: user.photoURL
    };
  },

  componentDidMount() {
    this.bindAsArray(this.state.chatRef.orderByChild('time').limitToFirst(100), 'messages')
  },

  postMessage() {
    this.state.chatRef.push({
      time: firebase.database.ServerValue.TIMESTAMP,
      message: this.refs.messageText.getValue(),
      name: this.state.name,
      photoUrl: this.state.photoUrl
    });
    this.setState({ message: '', open: true });
  },

  handleRequestClose() {
    this.setState({ open: false });
  },

  render() {
    var messages = this.state.messages.slice(0).reverse();
    return (
      <div>
        <List style={style}>
          <div>
            <Avatar src={this.state.photoUrl} />
            <TextField hintText="Your comment" ref="messageText"/>
            <RaisedButton onClick={this.postMessage} label="Add" />
            <Snackbar open={this.state.open}
              message="Your comment was added"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose} />
          </div>
          {messages.map((message, index) => <ChatMessage key={index} {...message} />) }
        </List>
      </div>
    )
  }
});

export default Chat;
