import React from 'react';
import { Route } from "react-router-dom";

import LogoImage from './assets/logo.png';
import Lobby from './Lobby';

const Start = props => {
  return(
    <div className="start-view">
      <div className="start-content">
        <div className="floating-container">
          <div className="logo">
            <img src={LogoImage} />
          </div>
          <Route exact path="/start" component={Lobby} />
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
