import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from './AppContext';

const Lobby = props => {
  const [appContext, appDispatch] = useContext(AppContext);
  
  return(
    <div>
      lobby
    </div>
  );
};

export default Lobby;
