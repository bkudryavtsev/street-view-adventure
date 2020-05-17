import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from './AppContext';

const Start = props => {
  const [appContext, appDispatch] = useContext(AppContext);

  return(
    <div id="start-page">
      <div id="start">
        <div id="start-options">
        
        </div>
        <div id="play-button-container">
          <Link to="/play" id="play-button">Play</Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
