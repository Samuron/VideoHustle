import React from 'react';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import ChatMessage from './ChatMessage'

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
        this.state.chatRef.push({ time: new Date().toDateString(), message: this.state.message, name: "Someone" });
    },

    render() {
        function renderChatMessage(m) {
            return (
                <li><ChatMessage time ={m.time} name ={m.name}  message={m.message}/></li>
            )
        }
        return (
            <div>
                <form onSubmit={ e => this.postMessage(e) }>
                    <input type="text" placeholder="add message" onChange={ e => this.setValue('message', e.target.value) } />
                    <button type="submit">Submit</button>
                </form>
                <ul>{this.state.messages.map(renderChatMessage) }</ul>
            </div>
        )
    }
});

export default Chat;