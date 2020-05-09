import React, { useContext } from 'react';
import { MapsContext } from './AppContext';

import { distance } from './util/math'; 

const Pano = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);

  const onGuess = event => {
    const pos = mapsContext.position;
    const guess = mapsContext.guess;
    if(pos && guess) {
      console.log(pos, guess);
      const d = distance(pos, guess);
      console.log(d);
    }
  };

  return(
    <div className="guess-box">
      <button onClick={onGuess}>Guess</button>
    </div>
  );
};

export default Pano;
