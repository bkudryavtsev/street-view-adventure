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
  const guessMarker = mapsContext.guessMarker;
  const guessMarkerPosition = guessMarker && guessMarker.getPosition();
  const locationMarker = mapsContext.locationMarker;
  const locationMarkerPosition = locationMarker && locationMarker.getPosition();
  const pos = locationMarkerPosition && locationMarkerPosition.toJSON();
  
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

  if(!guess && guessMarkerPosition) {
    setGuess(guessMarkerPosition.toJSON());
    setMode(modes.ready);
  }

  const onGuess = event => {
    if(pos && guess) {
      const currentRound = appContext.currentRound;
      
      if (currentMode.id === 1) {
        const d = distance(pos, guess);
        const loc = appContext.locations[currentRound];

        appDispatch({ type: 'pushGuessDistance', value: d });
        appDispatch({ type: 'setMapExpanded', value: true });
        
        appDispatch({ type: 'setLocationMarkerVisible', value: true });
        locationMarker.setVisible(true);
        
        const lineSymbol = {
          path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          scale: 2 
        };

        const line = new google.maps.Polyline({
          path: [loc.latLng, guess],
          strokeOpacity: 0,
          icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '10px'
          }],
          map: mapsContext.map
        });

        setMode(modes.next);
      } else if (currentMode.id === 2) {
        if(appContext.isMapExpanded) appDispatch({ type: 'setMapExpanded', value: false });

        const nextRound = currentRound < appContext.locations.length - 1 ? currentRound + 1 : 0;   
        appDispatch({ type: 'setCurrentRound', value: nextRound });

        setMode(modes.disabled);
        
        mapsDispatch({ type: 'setGuessMarkerVisible', value: false });
        guessMarker.setVisible(false);
        guessMarker.setPosition(null);

        appDispatch({ type: 'setLocationMarkerVisible', value: false });
        locationMarker.setVisible(false);

        setGuess(null);
      } 
    }
  };

  const background = hoverState ? currentMode.background.hover.main : currentMode.background.default.main;
  const borderBottom = hoverState ? currentMode.background.hover.hint : currentMode.background.default.hint;

  return(
    <div className="guess-button" 
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
