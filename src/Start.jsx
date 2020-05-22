import React from 'react';
import { Switch, Route } from "react-router-dom";

import StartOptions from './StartOptions';

import LogoImage from './assets/logo.png';
import Lobby from './Lobby';

const Start = props => {

  const sessionId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

  return(
    <div className="start-view">
      <div className="start-content">
        <div className="floating-container">
          <div className="logo">
            <img src={LogoImage} />
          </div>
          <Switch>
            <Route exact path="/"> 
              <StartOptions sessionId={sessionId} />
            </Route>
            <Route exact path="/lobby/:id">
              <Lobby />
            </Route>
          </Switch>
        </div>
        <div className="lettering">
          <div className="text-container">
            <h1>Street</h1>
          </div>
          <div className="text-container">
            <h1>View</h1>
          </div>
          <div className="text-container">
            <h1>Adventure</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
