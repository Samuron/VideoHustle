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
import Friends from './Friends';

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
      videosCount: 1,
      userRef: firebase.database().ref(`/users/${user.uid}`),
      videos: [],
      user: user
    };
  },

  componentDidMount() {
    this.state.userRef.child('videos').limitToFirst(this.state.videosCount).once('value', snapshot => {
      var newVideos = [];
      var s = snapshot.val();
      for(var index in s) { 
        newVideos.push(s[index].id);
      }
      this.setState({ videos: newVideos });
    });
    window.onscroll = e => this.handleScroll(e);    
  },

  handleScroll(e) {
    var scroll = document.body;

    if(scroll.clientHeight + scroll.scrollTop >= scroll.scrollHeight) {
      this.state.userRef.child('videos')
        .orderByKey()
        .startAt(this.state.videos[this.state.videos.length - 1])
        .limitToFirst(this.state.videosCount + 1)
        .once('value', snapshot => {
          console.log(snapshot.val());
          var newVideos = [];
          var s = snapshot.val();
          for(var index in s) { 
            newVideos.push(s[index].id);
        }
      this.setState({ videos: this.state.videos.concat(newVideos.slice(1)) });
    });
    }
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
        <Friends />
        <br />
        <Card style={style}>
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
