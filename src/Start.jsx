import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from './AppContext';

import SingleplayerImage from './assets/singleplayer.png';
import MultiplayerImage from './assets/multiplayer.png';

const Start = props => {
  const [appContext, appDispatch] = useContext(AppContext);
  const [mode, setMode] = useState({
    multiplayer: false,
    duration: 5
  });

  const sessionId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

  const durations = [5, 10, 15];

  const onModeSelect = multiplayer => {
    setMode({ ...mode, multiplayer })
  };

  const onDurationSelect = duration => {
    setMode({ ...mode, duration });  
  };

  return(
    <div className="centered-view">
      <div className="floating-container">
        <div className="main-title"><h1>Street View Adventure</h1></div>
        <div className="start-options">
          <div className={`mode-button-outline ${mode.multiplayer ? '' : 'selected'}`}>
            <div onClick={event => onModeSelect(false)} className="mode-button">
              <img src={SingleplayerImage} />
            </div>
          </div>
          <div className={`mode-button-outline ${mode.multiplayer ? 'selected' : ''}`}>
            <div onClick={event => onModeSelect(true)} className="mode-button">
              <img src={MultiplayerImage} />
            </div>
          </div>
        </div>
        <div className="start-options">
          {durations.map(duration => {
            return(
              <div key={`duration-${duration}`} className={`mode-button-outline small ${mode.duration === duration ? 'selected' : ''}`}
                  onClick={event => onDurationSelect(duration)}>
                <div className="mode-button">
                  <h2>{duration}</h2> 
                  <p>min</p>
                </div>
              </div>
            );
          })}
        </div>
        <div id="play-button-container">
          <Link to={`/${mode.multiplayer ? 'lobby' : 'play'}/${sessionId}`} id="play-button">
            <h3>{mode.multiplayer ? 'Play multiplayer' : 'Play singleplayer'}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
