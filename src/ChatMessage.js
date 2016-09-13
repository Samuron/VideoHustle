import React from 'react';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';


export default class ChatMessage extends React.Component {

  constructor(props) {
  	super(props)
  }

  render() {
    return <div>{this.props.time} {this.props.name}: {this.props.message}</div>
  }

}
