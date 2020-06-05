import React, { useContext } from 'react';

import Spinner from './Spinner';

const LocationCard = props => {
  const { flagUrl, city, country, guessDistance } = props;
  let displayGuessDistance;
  let unit = 'km';

  if (guessDistance < 1) {
    displayGuessDistance = Math.floor(guessDistance * 100);
    unit = 'm';
  } else {
    displayGuessDistance = Math.floor(guessDistance);
  }

  return(
    <div className="card">
      <div className="card-content">
        <div className="card-image">
          {flagUrl ? <img src={flagUrl} /> : <Spinner />}
        </div>
        <span>
          <h2>{city}</h2>
          <h3>{country}</h3>
        </span>
        <span>
          <p>Your guess was <b>{displayGuessDistance} {unit}</b> away</p>
        </span>
      </div>
    </div>
  );
};

export default LocationCard;
