import React, { useContext } from 'react';
import { MapsContext } from './AppContext';

const Pano = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);

  return(
    <div id="pano"></div>
  );
};

export default Pano;
