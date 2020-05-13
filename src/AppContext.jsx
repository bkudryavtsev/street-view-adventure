import React, { useReducer, createContext } from 'react';
import { colors as themeColors } from './theme';

export const AppContext = createContext();
export const MapsContext = createContext();
export const ThemeContext = createContext();

const initialAppState = {
  guessDistances: [],
  locations: [],
  currentRound: 0
};

const appReducer = (state, action) => {
  switch(action.type) {
    case 'pushGuessDistance':
      state.guessDistances.push(action.value);
      return state;
    case 'reset':
      return initialAppState;
    case 'setLocations':
      return { ...state, locations: action.value };
    case 'setCurrentRound':
      return { ...state, currentRound: action.value }
    case 'setConfirmingGuess':
      return { ...state, isConfirmingGuess: action.value };
    case 'setMapExpanded':
      return { ...state, mapExpanded: action.value }

    default:
      return state;
  }
};

export const AppContextProvider = props => {
  return (
    <AppContext.Provider value={useReducer(appReducer, initialAppState)}>
      {props.children}
    </AppContext.Provider>
  );
};

const mapsReducer = (state, action) => {
  switch(action.type) {
    case 'setLoaded':
      return { ...state, isLoaded: action.value };
    case 'setPano':
      return { ...state, pano: action.value };
    case 'setMap':
      return { ...state, map: action.value };
    case 'setMarker':
      return { ...state, marker: action.value };
    case 'setMarkerVisible':
      return { ...state, markerVisible: action.value };
    case 'setPosition':
      return { ...state, position: action.value };

    default:
      return state;
  }
};

export const MapsContextProvider = props => {
  const initialState = {};

  return (
    <MapsContext.Provider value={useReducer(mapsReducer, initialState)}>
      {props.children}
    </MapsContext.Provider>
  );
};

const themeReducer = (state, action) => {
  switch(action.type) {
    case 'setTheme':
      const colors = action.value === 'dark' ? themeColors.dark : themeColors.light;
      return { ...state, colors };

    default:
      return state;
  }
};

export const ThemeContextProvider = props => {
  const initialState = {
    colors: themeColors.light
  };

  return (
    <ThemeContext.Provider value={useReducer(themeReducer, initialState)}>
      {props.children}
    </ThemeContext.Provider>
  );
};


