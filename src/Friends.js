import React from 'react';
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

const style = {
  width: 500,
  margin: 'auto'
}

const Friends = React.createClass({

  mixins: [ReactFireMixin],

  getInitialState() {
    var user = firebase.auth().currentUser;
    return {
      friendsList: [],
      userRef: firebase.database().ref(`/users/${user.uid}`),
      usersRef: firebase.database().ref('/users'),
      newFriendSuggestion: []
    };
  },

  componentDidMount() {
    this.state.userRef.child('friends').limitToFirst(10).on('value', snapshot => {
      snapshot.val().forEach( (e, index) => {
        this.state.usersRef.orderByKey().equalTo(e).once('value', s => {
          if(!this.state.friendsList.includes(s.val())) {
            this.state.friendsList.push(s.val());
            this.setState({});
          }
        })
      })
    })
  },

  findFriend(value) {
    this.state.usersRef
      .orderByChild('displayName')
      .startAt(value)
      .limitToFirst(3).once('value', s => {
        this.setState({ newFriendSuggestion: 
          Object.keys(s.val()).map( key => {return {[key]: s.val()[key]} } )
        })
      })
  },

  addFriend() {
    this.findFriend();
    this.state.userRef.update({friends: ['wklDSouesTZGT9CUrAztiLHKmiv2']});
  },

  render() {
    function renderFriends(v, index) {
      var friendId = Object.keys(v)[0];
      var avatar = <Avatar src={v[friendId].photoUrl} />;
      return <ListItem key={index} leftAvatar={avatar} primaryText={v[friendId].displayName} />
    }
    
    return (
      <div>
        <Card style={style}>
          <CardTitle title="Whanna find a new friend?"/>
          <CardText>
            <TextField 
              hintText="Friends name" 
              onChange={(event, index, value) => this.findFriend(index)}/>
          </CardText>
            { this.state.newFriendSuggestion.map(renderFriends) }
          <CardActions>
            <RaisedButton onClick={this.addFriend} label="Add Friend" />
          </CardActions>
          <CardTitle title="Old buddies"/> 
            { this.state.friendsList.map(renderFriends) }
        </Card>
      </div>
    )
  }
});

export default Friends;
