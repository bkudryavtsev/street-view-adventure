import React, { useContext } from 'react';
import { MapsContext, AppContext } from './AppContext';

import { distance } from './util/math'; 

const GuessBox = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [appContext, appDispatch] = useContext(AppContext);
  const pos = mapsContext.position;
  const guess = mapsContext.guess;

  const onGuess = event => {
    if(pos && guess) {
      const d = distance(pos, guess);
      appDispatch({ type: 'pushGuessDistance', value: d });
      console.log(appContext.guessDistances);
    }
  };

  return(
    <div className="guess-box" 
        onClick={onGuess}
        style={guess ? { cursor: 'pointer' } : { background: '#bbb' }}>
      {guess ? <h3>Guess!</h3> : <h3>Click on the map to place a marker</h3>}
    </div>
  );
};

export default GuessBox;
