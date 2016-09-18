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
    // this.bindAsObject(this.state.userRef.child('friends').limitToFirst(10), 'friendsList');
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

  addFriend() {
    this.setState({});
    this.state.userRef.update({friends: ['wklDSouesTZGT9CUrAztiLHKmiv2']});
  },

  render() {
    function renderFriendList(v, index) {
      var friendId = Object.keys(v)[0];
      return <ListItem key={index} primaryText={v[friendId].displayName} />
    }
    
    return (
      <div>
        <Card style={style}>
          <CardTitle title="Whanna find a new friend?"/>
          <CardText>
            <TextField hintText="Friends name" ref="newFriend" />
          </CardText>
          <CardActions>
            <RaisedButton onClick={this.addFriend} label="Add Friend" />
          </CardActions>
          <CardTitle title="Old buddies"/> 
            { this.state.friendsList.map(renderFriendList) }
        </Card>
      </div>
    )
  }
});

export default Friends;
