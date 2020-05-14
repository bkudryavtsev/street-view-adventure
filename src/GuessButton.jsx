import React, { useContext, useState } from 'react';
import { MapsContext, AppContext, ThemeContext } from './AppContext';

import { distance } from './util/math'; 
import { getNextLocation, getCountryDetails } from './util/db';

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

  const guessMarkerPositionJSON = guessMarkerPosition && guessMarkerPosition.toJSON();
  
  const modes = {
    disabled: {
      id: 0,
      background: {
        default: themeColors.disabled,
        hover: themeColors.disabled
      },
      cursor: 'default',
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

  if(guessMarkerPositionJSON && 
      (!guess || !guessMarkerPosition.equals(new google.maps.LatLng(guess)))) {
    setGuess(guessMarkerPositionJSON);
    if(currentMode.id === 0) setMode(modes.ready);
  }

  const onGuess = event => {
    if(pos && guess) {
      // guess
      if (currentMode.id === 1) {
        const d = distance(pos, guess);

        appDispatch({ type: 'pushGuessDistance', value: d });
        appDispatch({ type: 'setMapExpanded', value: true });
        
        locationMarker.setVisible(true);
        
        mapsContext.guessLine.setPath([pos, guess]);
        mapsContext.guessLine.setVisible(true);

        mapsContext.clickListener.remove();

        setMode(modes.next);

        getCountryDetails(appContext.location.country).then(res => {
          console.log(res);
        });

        // next location
      } else if (currentMode.id === 2) {
        getNextLocation().then(location => {
          appDispatch({ type: 'setLocation', value: location });

          if(appContext.isMapExpanded) appDispatch({ type: 'setMapExpanded', value: false });

          const currentRound = appContext.currentRound;
          const nextRound = currentRound < appContext.locations.length - 1 ? currentRound + 1 : 0;   
          appDispatch({ type: 'setCurrentRound', value: nextRound });

          setMode(modes.disabled);
          
          guessMarker.setVisible(false);
          guessMarker.setPosition(null);

          locationMarker.setVisible(false);

          mapsContext.guessLine.setVisible(false);

          setGuess(null);
        });
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
