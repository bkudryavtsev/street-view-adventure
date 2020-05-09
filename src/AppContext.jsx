import React, { useReducer, createContext } from 'react';

export const MapsContext = createContext([]);

const mapsReducer = (state, action) => {
  switch(action.type) {
    case 'setPanorama':
      return { ...state, panorama: action.value };
    case 'setMap':
      return { ...state, map: action.value }
    case 'setGuess':
      return { ...state, guess: action.value }

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
