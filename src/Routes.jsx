import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Start from './Start';
import App from './App';
import Results from './Results';

const Routes = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <Start />
        </Route>
        <Route path="/play/:id">
          <App />
        </Route>
        <Route path="/results/:id">
          <Results />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
