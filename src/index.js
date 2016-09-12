import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Video from './Video';

import { Router, Route, hashHistory } from 'react-router'

const Navigation = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/video/:key" component={Video}/>
    </Route>
  </Router>
);

ReactDOM.render( Navigation, document.getElementById('root'));
