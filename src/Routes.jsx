import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Start from './Start';
import App from './App';

import MapsApi from './util/MapsApi';

const Routes = () => {
  return(
    <Router>
      <MapsApi />
      <Switch>
        <Route path="/start" component={Start} />
        <Route exact path="/play" component={App} />
        <Redirect exact from="/" to="/start" />
      </Switch>
    </Router>
  );
};

export default Routes;
