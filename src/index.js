import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './App';
import Video from './Video';
import Home from './Home';
import Login from './Login';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Navigation = (
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/video/:key" component={Video} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(Navigation, document.getElementById('root'));
