import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import firebase from 'firebase';
import { reduce } from 'lodash';

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
    firebase.database()
      .ref('/broadcasts')
      .on('value', snapshot => {
        const broadcasts = reduce( snapshot.val(), (acc, val, key) => {
          acc.push({
            ...val,
            key
          });
          return acc;
        }, []);

        this.setState({ broadcasts });
        console.log( 'broadcasts', broadcasts );
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
