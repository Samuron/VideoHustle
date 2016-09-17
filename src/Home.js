import React from 'react';
import firebase from 'firebase';
import { map } from 'lodash';
import { Link } from 'react-router';
import ReactFireMixin from 'reactfire';
import SignOut from './SignOut'

const Home = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      videos: [],
      videoLink: ''
    };
  },

  setValue( propName, value ) {
    this.setState({
      [propName]: value
    })
  },

  shareVideo(e) {
    e.preventDefault();
    this.videosRef.push({ link: this.state.videoLink, state: 'play', time: 0.0 });
    this.setState({
      videoLink: ''
    });
  },

  componentDidMount() {
    this.videosRef = firebase.database().ref('/videos');

    this.bindAsArray(this.videosRef, 'videos')
  },

  render() {
    const { videos } = this.state;
    return (
      <div>
        <h3>Add new video</h3>
        <form onSubmit={ e => this.shareVideo(e) }>
          <input type="text"
                 placeholder="insert link"
                 onChange={ e => this.setValue( 'videoLink', e.target.value)}
                 value={ this.state.videoLink } />
          <button type="submit">Submit</button>
        </form>

        <h3>All videos</h3>
        <ul>
          {map(videos, video =>
            (
              <li key={video['.key']}>
                <Link to={`/video/${video['.key']}`} >
                  {video['.key']}
                </Link>
              </li>
            )
          )}
        </ul>
        <SignOut />
      </div>
    )
  }
});

export default Home;
