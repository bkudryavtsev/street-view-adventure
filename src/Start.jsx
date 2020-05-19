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

  const durations = [5, 10, 15];

  const onPlayModeSelect = (event, multiplayer) => {
    setMode({ ...mode, multiplayer })
  };

  const onDurationSelect = duration => {
    setMode({ ...mode, duration });  
  };

  return(
    <div className="centered-view bg">
      <div className="floating-container">
        <div className="logo">
          <img src={LogoImage} />
          <h1>Street View Adventure</h1>
        </div>
        <div className="description">
          <p>Get dropped in an unknown city and figure out where you are by navigating around in Google Street View.</p>
          <p>Endure alone or compete with your friends!</p>
        </div>
        <fieldset className="start-field">
          <legend>Select game type</legend>
          <div className="start-options">
            <div 
              onClick={event => onPlayModeSelect(event, false)}
              className="mode-button"
              style={!mode.multiplayer ? {
                background: colors.highlight.main
              } : {}}>
              <img src={SingleplayerImage} />
              <p>Singleplayer</p>
            </div>
            <div 
              onClick={event => onPlayModeSelect(event, true)} 
              className="mode-button"
              style={mode.multiplayer ? {
                background: colors.highlight.main
              } : {}}>
              <img src={MultiplayerImage} />
              <p>Multiplayer</p>
            </div>
          </div>
        </fieldset>
        <fieldset className="start-field">
          <legend>Choose duration</legend>
          <div className="start-options">
            {durations.map(duration => {
              return(
                <div 
                  className="mode-button small" 
                  onClick={event => onDurationSelect(duration)}
                  style={mode.duration === duration ? {
                    background: colors.highlight.main
                  } : {}}>
                  <h2>{duration}</h2> 
                  <p>min</p>
                </div>
              );
            })}
          </div>
        </fieldset>
        <div id="play-button-container">
          <Link to={`/${mode.multiplayer ? 'lobby' : 'play'}/${sessionId}`} id="play-button">
            <h3>Play</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
