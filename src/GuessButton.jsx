import React, { useContext, useState } from 'react';
import { MapsContext, AppContext, ThemeContext } from './AppContext';

import { distance } from './util/math'; 
import { getNextLocation, getCountryDetails } from './util/db';

import './css/spinner.css';

const GuessButton = props => {
  const [hoverState, setHover] = useState(false);
  const [isMouseDown, setMouseDown] = useState(false);
  const [isWaiting, setWaiting] = useState(false);
  const [guess, setGuess] = useState(null);

  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [appContext, appDispatch] = useContext(AppContext);
  const [themeContext, themeDispatch] = useContext(ThemeContext);
  
  const { guessMarker, locationMarker } = mapsContext;

  const themeColors = themeContext.colors;
  const guessMarkerPosition = guessMarker && guessMarker.getPosition();
  const locationMarkerPosition = locationMarker && locationMarker.getPosition();
  const locationMarkerPositionJSON = locationMarkerPosition && locationMarkerPosition.toJSON();
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
    if(locationMarkerPositionJSON && guess) {
      // guess
      if (currentMode.id === 1) {
        const d = distance(locationMarkerPositionJSON, guess);

        appDispatch({ type: 'pushGuessDistance', value: d });
        appDispatch({ type: 'setMapExpanded', value: true });

        setMode(modes.next);
        appDispatch({ type: 'setView', value: 'guessResult' });

        getCountryDetails(appContext.location.country).then(res => {
          appDispatch({ type: 'setCountryDetails', value: res });
        });

        // next location
      } else if (currentMode.id === 2) {
        setWaiting(true);
        setMode(modes.disabled);
        appDispatch({ type: 'setView', value: 'loadingMap' });
        
        getNextLocation().then(location => {
          appDispatch({ type: 'setLocation', value: location });

          if(appContext.isMapExpanded) appDispatch({ type: 'setMapExpanded', value: false });

          const currentRound = appContext.currentRound;
          appDispatch({ type: 'setCurrentRound', value: currentRound + 1 });

          setGuess(null);
          setWaiting(false);
          appDispatch({ type: 'setView', value: 'guess' });
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
        onMouseLeave={event => {
          setHover(false);
          setMouseDown(false);
        }}
        onMouseDown={event => setMouseDown(true)}
        onMouseUp={event => setMouseDown(false)}
        style={{
          background: background, 
          cursor: currentMode.cursor, 
          borderBottom: currentMode.id !== 0 && isMouseDown ? 'none' : `3px solid ${borderBottom}` 
        }}>
      {isWaiting ? 
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div> : 
        <h3>{currentMode.text}</h3>
      }
    </div>
  );
};

export default GuessButton;
