import React, {useEffect, useState} from 'react';

import { getTimestamp } from './util/time';

const CountdownTimer = props => {
  const { until, onComplete } = props;

  const [timer, setTimer] = useState(null); 
  const [currentTime, setCurrentTime] = useState(getTimestamp());

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!timer && until && currentTime < until) {
    setTimer(setInterval(() => {
      const timestamp = getTimestamp();
      setCurrentTime(timestamp);
    }, 1000));
  }

  let displayMinutes = '--';
  let displaySeconds = '--';

  if (timer) {
    const timeLeft = until - currentTime;

    if (timeLeft > 0) {
      let minutes = timeLeft / 60000;
      const seconds = Math.floor((minutes % 1) * 60);
      minutes = Math.floor(minutes);

      displayMinutes = minutes < 10 ? `0${minutes.toString().substr(0, 1)}` : minutes.toString().substr(0, 2);
      displaySeconds = seconds < 10 ? `0${seconds.toString().substr(0, 1)}` : seconds.toString().substr(0, 2);
    } else {
      clearInterval(timer);
      setTimer(null);
      setTimeout(() => onComplete(), 500);
    }
  }

  const secondsLeft = parseInt(displayMinutes) * 60 + parseInt(displaySeconds);

  return(
    <div style={secondsLeft < 10 ? { color: 'red'} : {}}>
      {displayMinutes} : {displaySeconds}
    </div>
  );
};

export default CountdownTimer;
