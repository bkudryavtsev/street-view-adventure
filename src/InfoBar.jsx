import React, { useContext } from 'react';
import { AppContext } from './AppContext';

import GuessButton from './GuessButton';
import PlayerStats from './PlayerStats';
import RemoteStats from './RemoteStats';

const InfoBar = props => {
  const [appContext, appDispatch] = useContext(AppContext);

  return(
    <div className="info-bar">
      <div className="s1 centered-items">
        <PlayerStats />
      </div>
      <div className="s1 centered-items">
        <GuessButton />
      </div>
      <div className="s1 centered-items">
        <RemoteStats />
      </div>
    </div>
  );
};

export default InfoBar;
