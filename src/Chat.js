import React from 'react';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

const ChatMessage = ({ time, name, message }) => {
  var secondaryText = <p><span style={{color: darkBlack}}>{time}</span> -- {message}</p>;
  return (
    <div>
    <ListItem primaryText={name} secondaryText={secondaryText}/>
    <Divider inset={true} />
    </div>
    );
};

const style = {
  width:500,
  height:300,
  overflow:'scroll'
}
const Chat = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      messages: [],
      message: '',
      chatRef: firebase.database().ref(`/chats/${this.props.videoKey}`)
    };
  },

  componentDidMount() {
    this.bindAsArray(this.state.chatRef, 'messages')
  },

  postMessage(e) {
    e.preventDefault();

    this.state.chatRef.push({
      time: new Date().toDateString(),
      message: this.state.message,
      name: "Someone"
    });
    this.setState({ message: '' });
  },

  render() {
    return (
      <div>
        <form onSubmit={ e => { this.postMessage(e) } }>
          <input
            type="text"
            placeholder="add message"
            onChange={ e => this.setState({ message: e.target.value }) }
            value={ this.state.message }/>
          <button type="submit">Submit</button>
        </form>
        <List style={style}>
          {this.state.messages.map((message, index) => <ChatMessage key={index} {...message} />) }
        </List>
      </div>
    )
  }
});

export default Chat;
