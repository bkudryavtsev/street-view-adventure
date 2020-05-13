import React, { useContext, useState } from 'react';
import { MapsContext, AppContext, ThemeContext } from './AppContext';

import { distance } from './util/math'; 

const GuessButton = props => {
  const [hoverState, setHover] = useState(false);
  const [guess, setGuess] = useState(null);

  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [appContext, appDispatch] = useContext(AppContext);
  const [themeContext, themeDispatch] = useContext(ThemeContext);
  
  const themeColors = themeContext.colors;
  const pos = mapsContext.position;
  const marker = mapsContext.marker;
  const markerPosition = marker && marker.getPosition();
  
  const modes = {
    disabled: {
      id: 0,
      background: {
        default: themeColors.disabled,
        hover: themeColors.disabled
      },
      cursor: 'auto',
      text: 'Click on map to place a marker'
    },
    ready: {
      id: 1,
      background: {
        default: themeColors.success,
        hover: themeColors.secondary
      },
      cursor: 'pointer',
      text: 'Guess'
    },
    next: {
      id: 2,
      background: {
        default: themeColors.secondary,
        hover: themeColors.success
      },
      cursor: 'pointer',
      text: 'Next location'
    }
  };

  const [currentMode, setMode] = useState(modes.disabled);

  if(!guess && markerPosition) {
    setGuess(markerPosition.toJSON());
    setMode(modes.ready);
  }

  const onGuess = event => {
    if(pos && guess) {
      const currentRound = appContext.currentRound;
      
      if (currentMode.id === 1) {
        const d = distance(pos, guess);
        const loc = appContext.locations[currentRound];

        alert(`Your guess was ${d} km away from the actual location, ${loc.name} ${loc.city}, ${loc.country}`);

        appDispatch({ type: 'pushGuessDistance', value: d });
        setMode(modes.next);
      } else if (currentMode.id === 2) {
        appDispatch({ type: 'setCurrentRound', value: currentRound + 1 });
        setMode(modes.disabled);
        
        mapsDispatch({ type: 'setMarkerVisible', value: false });
        marker.setVisible(false);
        marker.setPosition(null);

        setGuess(null);
      } 
    }
  };

  const background = hoverState ? currentMode.background.hover.main : currentMode.background.default.main;
  const borderBottom = hoverState ? currentMode.background.hover.hint : currentMode.background.default.hint;

  return(
    <div className="guess-button" 
        key={'guess-button-' + currentMode.id}
        onClick={onGuess}
        onMouseEnter={event => setHover(true)}
        onMouseLeave={event => setHover(false)}
        style={{
          background: background, 
          cursor: currentMode.cursor, 
          borderBottom: `3px solid ${borderBottom}` 
        }}>
      <h3>{currentMode.text}</h3>
    </div>
  );
};

export default GuessButton;
