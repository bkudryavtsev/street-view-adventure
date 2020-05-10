import React, { useContext } from 'react';
import { AppContext } from './AppContext';

const RemoteStats = props => {
  const [appContext, appDispatch] = useContext(AppContext);

  return(
    <div>Remote stats</div>
  );
};

export default RemoteStats;
