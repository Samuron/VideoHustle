import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

export default class App extends Component {
  render() {
    return (
      <div>
        <AppBar title="Are you ready to hustle with ya mob?!" iconClassNameRight="muidocs-icon-navigation-expand-more"  />
        {this.props.children}
      </div>
    );
  }
}
