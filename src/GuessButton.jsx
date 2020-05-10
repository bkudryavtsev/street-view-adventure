import React, { useContext, useState } from 'react';
import { MapsContext, AppContext } from './AppContext';

import { distance } from './util/math'; 

const GuessButton = props => {
  const [hoverState, setHover] = useState(false);
  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [appContext, appDispatch] = useContext(AppContext);
  const pos = mapsContext.position;
  const guess = mapsContext.guess;

  let background = guess ? '#d6ec73' : '#bbb';
  background = guess && hoverState ? '#ecd873' : background;

  let cursor = guess ? 'pointer' : 'auto';
  let borderBottom = guess ? '3px solid #c7d391' : '3px solid #aaa';
  borderBottom = guess && hoverState ? '3px solid #d3c891' : borderBottom;

  const onGuess = event => {
    if(pos && guess) {
      const d = distance(pos, guess);
      appDispatch({ type: 'pushGuessDistance', value: d });
      console.log(appContext.guessDistances);
    }
  };

  return(
    <div className="guess-button" 
        onClick={onGuess}
        onMouseEnter={event => setHover(true)}
        onMouseLeave={event => setHover(false)}
        style={{ background, cursor, borderBottom }}>
      {guess ? <h3>Guess!</h3> : <h3>Click on the map to place a marker</h3>}
    </div>
  );
};

export default GuessButton;
