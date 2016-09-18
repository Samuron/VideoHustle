import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import firebase from 'firebase';
import { reduce, some } from 'lodash';

const styles = {
  container: {
    width: '1010px',
    margin: '20px auto'
  },
  item: {
    width: '230px',
    float: 'left',
    marginLeft: '20px'
  }
};
const SubscribeCard = ({ description, author, photoUrl, onClick }) => (
  <Card style={styles.item} >
    <CardHeader
      title={author}
      subtitle={description}
      avatar={photoUrl}
    />
    <CardActions>
      <FlatButton label="Open" onClick={e => onClick()} />
    </CardActions>
  </Card>
);

export default class SubscribtionList extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.state = {
      broadcasts: []
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();

    firebase.database()
      .ref( `/users/${currentUser.uid}`)
      .once( 'value', snapshot => {
        const { friends } = snapshot.val();
        if (!friends) return;

        firebase.database()
          .ref('/broadcasts')
          .on('value', snapshot => {
            let broadcasts = reduce( snapshot.val(), (acc, val, key) => {
              acc.push({
                ...val,
                key
              });
              return acc;
            }, []);

            if (!friends || !friends.length ) {
              broadcasts = []
            } else {
              broadcasts = broadcasts.filter(broadcast => {
                return some(friends, friend => {
                  const key = Object.keys(friend)[0];
                  return key == broadcast.key;
                })
              })
            }

            this.setState({ broadcasts });
          });
      });


  }

  render() {
    return (
      <div style={styles.container}>
        {this.state.broadcasts.map( broadcast => (
          <SubscribeCard
            key={broadcast.key}
            {...broadcast}
            onClick={ e => this.context.router.push(`/subscription/${broadcast.key}`)}
          />
        ))}
      </div>
    )
  }
}
