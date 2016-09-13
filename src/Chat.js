import React from 'react';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';

const ChatMessage = ({ time, name, message }) => {
  return <li>{time} {name}: {message}</li>
};

const Chat = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      messages: [],
      message: '',
      chatRef: firebase.database().ref(`/videos/${this.props.videoKey}/chat`)
    };
  },

  setValue(propName, value) {
    this.setState({
      [propName]: value
    })
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
  },

  render() {
    return (
      <div>
        <form onSubmit={ e => this.postMessage(e) }>
          <input
            type="text"
            placeholder="add message"
            onChange={ e => this.setValue('message', e.target.value) } />
          <button type="submit">Submit</button>
        </form>
        <ul>
          {this.state.messages.map((message, index) => <ChatMessage key={index} {...message} /> ) }
        </ul>
      </div>
    )
  }
});

export default Chat;
