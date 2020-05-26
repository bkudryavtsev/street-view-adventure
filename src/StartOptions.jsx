import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import SingleplayerImage from './assets/singleplayer.png';
import MultiplayerImage from './assets/multiplayer.png';

const StartOptions = props => {
  const [mode, setMode] = useState({
    playMode: 0,
    duration: 5
  });

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

  const playUrl = mode.playMode === 1 ? '/start/lobby' : '/play';

  return(
    <div className="content">
      <div className="blurb">
        <h3>Find yourself in an unknown place and figure out where you are by navigating around in Google Street View.</h3>
      </div>
      <div className="options">
        <div className="column">
          {Array.from(playModeMap.keys()).map(playMode => {
            const playModeDetails = playModeMap.get(playMode);
            return(
              <a
                href="#"
                key={'playMode' + playMode}
                className={`button ${playMode === mode.playMode ? 'active' : ''}`} 
                onClick={event => onPlayModeSelect(playMode)}>
                <img src={playModeDetails.icon} />
                <h3>{playModeDetails.title}</h3>
              </a>
            );
          })}
        </div>
        <div className="row">
          {Array.from(durationMap.keys()).map(durationName => {
            const duration = durationMap.get(durationName);
            return(
              <a
                href="#"
                key={'duration' + duration}
                className={`button small ${duration === mode.duration ? 'active' : ''}`}
                onClick={event => onDurationSelect(duration)}>
                <h3>{durationName}</h3>
                <p>{duration} {!isNaN(duration) && 'min'}</p>
              </a>
            );
          })}
        </div>
      </div>
      <div className="centered-button-container">
        <Link to={playUrl} className="button play">
          <h3>Play</h3>
        </Link>
      </div>
    </div>
  );
};

export default StartOptions;
