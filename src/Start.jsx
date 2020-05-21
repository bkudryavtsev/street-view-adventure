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
    playMode: 0,
    duration: 5
  });

  const sessionId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

  const playModes = [
    [0, { title: 'Endure alone', multiplayer: false, icon: SingleplayerImage }], 
    [1, { title: 'Explore with friends', multiplayer: true, icon: MultiplayerImage }]
  ];
  const playModeMap = new Map(playModes);

  const durations = [['Quick', 5], ['Tourist', 10], ['Explorer', 'Untimed']];
  const durationMap = new Map(durations);

  const onPlayModeSelect = playMode => {
    setMode({ ...mode, playMode });
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
                {Array.from(playModeMap.keys()).map(playMode => {
                  const playModeDetails = playModeMap.get(playMode);
                  return(
                    <div 
                      className={`mode-button ${playMode === mode.playMode ? 'selected' : ''}`} 
                      onClick={event => onPlayModeSelect(playMode)}>
                      <img src={playModeDetails.icon} />
                      <h3>{playModeDetails.title}</h3>
                    </div>
                  );
                })}
              </div>
              <div className="row">
                {Array.from(durationMap.keys()).map(durationName => {
                  const duration = durationMap.get(durationName);
                  return(
                    <div 
                      className={`mode-button small ${duration === mode.duration ? 'selected' : ''}`}
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
