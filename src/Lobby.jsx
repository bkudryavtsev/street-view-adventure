import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { AppContext } from './AppContext';

const Lobby = props => {
  const [appContext, appDispatch] = useContext(AppContext);
  
  const { id } = useParams();

  return(
    <div className="centered-view">
      <div id="lobby">
        <div id="players">
        
        </div>
        <div id="play-button-container">
          <Link to={`/play/${id}`} id="play-button">
            <h3>Play</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
