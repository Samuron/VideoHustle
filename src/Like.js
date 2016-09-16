import React from 'react';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';

const Like = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      isLiked: '',
      chatRef: firebase.database().ref(`/videos/${this.props.videoKey}`)
    };
  },

  componentDidMount() {
    this.state.chatRef.on( 'value', snapshot => {
      this.setState({ isLiked: snapshot.val().isLiked || false });
    });
  },

  render() {
    return (
      <div>
        <label>
          <input 
            type="checkbox" 
            name="Liked"
            checked={ this.state.isLiked }
            onClick={ e => { this.state.chatRef.update({ isLiked: e.target.checked }) } }
          />
          Like
        </label>
      </div>
    )
  }
});

export default Like;
