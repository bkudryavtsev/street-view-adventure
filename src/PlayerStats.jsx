import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';

import CountdownTimer from './CountdownTimer';
import { onUserChange } from './util/db';

const PlayerStats = props => {
  const [appContext, appDispatch] = useContext(AppContext);
  const [timerEnd, setTimerEnd] = useState(null);

  const onCountdownComplete = () => {
    appDispatch({ type: 'setCountdownComplete', value: true });
  };

  const { sessionParams, userParams } = appContext;
  const { gameStartTime, sessionId } = sessionParams;

  useEffect(() => {
    if (gameStartTime) {
      const duration = sessionParams.duration;
      const endTime = !isNaN(duration) ? gameStartTime + duration * 60000 : null; 
      setTimerEnd(endTime);

      const releaseUserListener = onUserChange(sessionId, userParams.id, snapshot => {
        appDispatch({ type: 'setUserParams', value: snapshot.data() });
      });

      return () => {
        releaseUserListener();
      };
    }
  }, [gameStartTime]);

  return(
    <div className="info-bar-stats">
      <div>{userParams.score}</div>
      <div>{userParams.locationsVisited}</div>
      <CountdownTimer 
        until={timerEnd}
        onComplete={onCountdownComplete} />
    </div>
  );
};

export default PlayerStats;
