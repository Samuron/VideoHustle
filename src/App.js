import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const App = React.createClass({
  getInitialState() {
    return { open: true };
  },

  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  },

  handleNavClick() {
    this.setState({ open: !this.state.open });
  },

  render() {
    return (
      <div>
        <AppBar style={{ position: 'fixed', top: 0, left: 0 }}
          onLeftIconButtonTouchTap={this.handleNavClick}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        <Drawer open={this.state.open}>
          <AppBar title="Video hustle" iconElementLeft={<IconButton onClick={this.handleNavClick}><NavigationClose /></IconButton>}/>
          <MenuItem onTouchTap={e => this.context.router.push('/feed') }>Feed</MenuItem>
          <MenuItem onTouchTap={e => this.context.router.push('/friends') }>Friends</MenuItem>
          <MenuItem onTouchTap={e => this.context.router.push('/broadcast') }>Broadcast</MenuItem>
        </Drawer>
        <div style={{ paddingTop: this.context.muiTheme.spacing.desktopKeylineIncrement }}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default App;
