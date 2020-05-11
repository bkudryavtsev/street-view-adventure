import React, { useReducer, createContext } from 'react';
import { colors as themeColors } from './theme';

export const AppContext = createContext();
export const MapsContext = createContext();
export const ThemeContext = createContext();

const appReducer = (state, action) => {
  switch(action.type) {
    case 'pushGuessDistance':
      state.guessDistances.push(action.value);
      return state;
    case 'clearGuesses':
      state.guessDistances = [];
      return state;

    default:
      return state;
  }
};

export const AppContextProvider = props => {
  const initialState = {
    guessDistances: []
  };

  return (
    <AppContext.Provider value={useReducer(appReducer, initialState)}>
      {props.children}
    </AppContext.Provider>
  );
};

const mapsReducer = (state, action) => {
  switch(action.type) {
    case 'setLoaded':
      return { ...state, loaded: action.value };
    case 'setPanorama':
      return { ...state, panorama: action.value };
    case 'setMap':
      return { ...state, map: action.value };
    case 'setGuess':
      return { ...state, guess: action.value };
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


