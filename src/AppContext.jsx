import React, { useReducer, createContext } from 'react';
import { colors as themeColors } from './theme';

export const AppContext = createContext();
export const MapsContext = createContext();
export const ThemeContext = createContext();

const initialAppState = {
  guessDistances: [],
  locations: [],
  currentRound: 0,
  isMapExpanded: false,
  appView: 'guess',
  update: 0
};

const appReducer = (state, action) => {
  switch(action.type) {
    case 'pushGuessDistance':
      state.guessDistances.push(action.value);
      return state;
    case 'reset':
      return initialAppState;
    case 'setLocation':
      return { ...state, location: action.value };
    case 'setCurrentRound':
      return { ...state, currentRound: action.value };
    case 'setMapExpanded':
      return { ...state, isMapExpanded: action.value };
    case 'setCountryDetails':
      return { ...state, countryDetails: action.value };
    case 'setView':
      return { ...state, appView: action.value };
    case 'setSessionId':
      return { ...state, sessionId: action.value };
    case 'update':
      return { ...state, update: state.update + 1 };

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
    case 'setClickListener':
      return { ...state, clickListener: action.value };
    case 'setGuessMarker':
      return { ...state, guessMarker: action.value };
    case 'setLocationMarker':
      return { ...state, locationMarker: action.value };
    case 'setGuessLine':
      return { ...state, guessLine: action.value }

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


