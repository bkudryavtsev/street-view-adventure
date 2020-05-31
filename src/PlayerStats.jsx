import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';

import CountdownTimer from './CountdownTimer';

const PlayerStats = props => {
  const [appContext, appDispatch] = useContext(AppContext);
  const [timerEnd, setTimerEnd] = useState(null);

  const onCountdownComplete = () => {
    appDispatch({ type: 'setCountdownComplete', value: true });
  };

  const gameStartTime = appContext.sessionParams.gameStartTime;

  useEffect(() => {
    if (gameStartTime) {
      const duration = appContext.sessionParams.duration;
      const endTime = gameStartTime + duration * 60000; 
      setTimerEnd(endTime);
    }
  }, [gameStartTime]);

  return(
    <div>
      <CountdownTimer 
        until={timerEnd}
        onComplete={onCountdownComplete} />
    </div>
  );
};

export default PlayerStats;
