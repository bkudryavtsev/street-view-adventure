import React, { useContext } from 'react';
import { MapsContext, AppContext } from './AppContext';

const Pano = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [appContext, appDispatch] = useContext(AppContext);

  return(
    <div id="pano"></div>
  );
};

export default Pano;
