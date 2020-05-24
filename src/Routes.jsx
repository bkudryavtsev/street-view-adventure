import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Start from './Start';
import App from './App';
import Results from './Results';

const Routes = () => {
  return(
    <Router>
      <Switch>
        <Route path="/start">
          <Start />
        </Route>
        <Route exact path="/play/:id?">
          <App />
        </Route>
        <Route exact path="/results/:id?">
          <Results />
        </Route>
        <Redirect exact from="/" to="/start" />
      </Switch>
    </Router>
  );
};

export default Routes;
