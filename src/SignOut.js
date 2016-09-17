import React, { Component } from 'react';
import firebase from 'firebase';

export default class SignOut extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    this.setState({ user })
  }

  signOut() {
    firebase.auth().signOut();
  }

  render() {
     //const { photoURL, displayName } = this.state.user;

    return (
      <div>
        { this.state.user ?
          ([
            <img src={this.state.user.photoURL} width='50' height='50' />,
            <span>{this.state.user.displayName}</span>
          ]) : null
        }
        <button onClick={e => this.signOut()}>SignOut</button>
      </div>
    )
  }
}
