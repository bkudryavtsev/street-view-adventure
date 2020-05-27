import React, { useContext, useState, useEffect } from 'react';

import { durationMap } from './util/constants';

const StartOptions = props => {
  const { duration } = props;

  const [currentDuration, setCurrentDuration] = useState(duration || 
    Array.from(durationMap)[0][1]);

  useEffect(() => {
    if (duration) {
      setCurrentDuration(duration);
    }
  }, [duration])

  return(
    <div className="row">
      {Array.from(durationMap.keys()).map(durationName => {
        const durationTime = durationMap.get(durationName);
        return(
          <a
            href="#"
            key={'duration' + durationTime}
            className={`button small ${durationTime === currentDuration ? 'active' : ''}`}
            onClick={event => {
              if (durationTime !== currentDuration) {
                setCurrentDuration(durationTime);
                props.onDurationChange(durationTime);
              }
            }}>
            <h3>{durationName}</h3>
            <p>{durationTime} {!isNaN(durationTime) && 'min'}</p>
          </a>
        );
      })}
    </div>
  );
};

export default StartOptions;
