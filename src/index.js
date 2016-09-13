import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './App';
import Video from './Video';
import Home from './Home';

const Navigation = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/video/:key" component={Video} />
    </Route>
  </Router>
);

ReactDOM.render( Navigation, document.getElementById('root'));
