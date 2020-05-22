import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { AppContext } from './AppContext';

const Lobby = props => {
  const [appContext, appDispatch] = useContext(AppContext);
  
  const { id } = useParams();

  return(
    <div>
      lobby {id}
    </div>
  );
};

export default Lobby;
