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
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FeedVideo from './FeedVideo';

const style = {
  width: 500,
  margin: 'auto'
}

const opts = {
  width: '500',
  height: '300',
  frameBorder: '0'
}

const Feed = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState() {
    var user = firebase.auth().currentUser;
    return {
      videos_count: 10,
      userRef: firebase.database().ref(`/users/${user.uid}`),
      videos: [],
      user: user
    };
  },

  componentDidMount() {
    this.bindAsArray(this.state.userRef.child('videos').limitToFirst(this.state.videos_count), 'videos')
  },

  postVideo() {
    var link = this.refs.videoLink.getValue();

    if (!link)
      return;

    var videoId = link.includes('?v=')
      ? link.split('?v=')[1].slice(0, 11)
      : link.substr(link.lastIndexOf('/') + 1);

    if (!videoId)
      return;

    var videoRefs = firebase.database().ref('/videos/').push({
      videoYouTubeId: videoId,
      author: this.state.user.displayName,
      photoUrl: this.state.user.photoURL,
      description: this.refs.videoDescription.getValue()
    });

    this.state.userRef.child('videos').push({
      id: videoRefs.getKey()
    });
  },

  render() {
    // var messages = this.state.messages.slice(0).reverse();
    function renderVideoComponent(v, index) {
      return <FeedVideo key={index} videoKey={v.id} opts={opts}/>
    }

    return (
      <div>
        <Card style ={style}>
          <CardHeader
            title="Share youtube video"
            subtitle="Paste video link"
            avatar={this.state.user.photoURL}
            />
          <CardTitle title="Any cool link?"/>
          <CardText>
            <TextField hintText="YouTube video link" ref="videoLink" />
          </CardText>
          <CardTitle title="Drop some words for ya niggas?"/>
          <CardText>
            <TextField hintText="Add description" ref="videoDescription" />
          </CardText>
          <CardActions>
            <RaisedButton onClick={this.postVideo} label="Post" />
          </CardActions>
        </Card>
        <List style={style}>
          { this.state.videos.map(renderVideoComponent) }
        </List>
      </div>
    )
  }
});

export default Feed;
