import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppContext, ThemeContext } from './AppContext';

import LogoImage from './assets/logo.png';
import SingleplayerImage from './assets/singleplayer.png';
import MultiplayerImage from './assets/multiplayer.png';

const Start = props => {
  const [appContext, appDispatch] = useContext(AppContext);
  const [themeContext, themeDispatch] = useContext(ThemeContext);
  
  const { colors } = themeContext;

  const [mode, setMode] = useState({
    multiplayer: false,
    duration: 5
  });

  const sessionId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

  const durations = [['Quick', 5], ['Tourist', 10], ['Explorer', 'Untimed']];
  const durationMap = new Map(durations);

  const onPlayModeSelect = (event, multiplayer) => {
    event.currentTarget.classList.add('selected');
    setMode({ ...mode, multiplayer })
  };

  const onDurationSelect = duration => {
    setMode({ ...mode, duration });  
  };

  return(
    <div className="start-view">
      <div className="start-content">
        <div className="floating-container">
          <div className="logo">
            <img src={LogoImage} />
          </div>
          <div className="content">
            <div className="blurb">
              <h3>Find yourself in an unknown place and figure out where you are by navigating around in Google Street View.</h3>
            </div>
            <div className="options">
              <div className="column">
                <div 
                  onClick={event => onPlayModeSelect(event, false)}
                  className="mode-button">
                  <img src={SingleplayerImage} />
                  <h3>Endure alone</h3>
                </div>
                <div 
                  onClick={event => onPlayModeSelect(event, true)} 
                  className="mode-button">
                  <img src={MultiplayerImage} />
                  <h3>Explore with friends</h3>
                </div>
              </div>
              <div className="row">
                {Array.from(durationMap.keys()).map(durationName => {
                  const duration = durationMap.get(durationName);
                  return(
                    <div 
                      className="mode-button small" 
                      onClick={event => onDurationSelect(duration)}>
                      <h3>{durationName}</h3>
                      <p>{duration} {!isNaN(duration) && 'min'}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="centered-button-container">
              <Link to={`/${mode.multiplayer ? 'lobby' : 'play'}/${sessionId}`} className="mode-button play">
                <h3>Play</h3>
              </Link>
            </div>
          </div>
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
