import React, { useContext } from 'react';
import { AppContext } from './AppContext';

const PlayerStats = props => {
  const [appContext, appDispatch] = useContext(AppContext);

  return(
    <div>Player stats</div>
  );
};

export default PlayerStats;
