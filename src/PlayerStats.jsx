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

  console.log(userParams.score);

  return(
    <div className="info-bar-stats">
      <div>
        {userParams.score || userParams.score === 0 ?
            userParams.score : '--'}
        <p>Score</p>
      </div>
      <div>
        {userParams.locationsVisited || '--'}
        <p>Visited</p>
      </div>
      <div>
        <CountdownTimer 
          until={timerEnd}
          onComplete={onCountdownComplete} />
        <p>Time left</p>
      </div>
    </div>
  );
};

export default PlayerStats;
