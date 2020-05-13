import React, { useContext } from 'react';
import { MapsContext, AppContext } from './AppContext';

const Pano = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [appContext, appDispatch] = useContext(AppContext);

  const pano = mapsContext.pano;
  const locations = appContext.locations;
  const currentRound = appContext.currentRound;

  if(mapsContext.isLoaded && pano && appContext.locations.length > 0) {
    if(locations[currentRound]) {
      const currLocation = new google.maps.LatLng(mapsContext.position);
      const newLocation = new google.maps.LatLng(locations[currentRound].latLng);
      if(!currLocation.equals(newLocation)) {
        pano.setPosition(newLocation);
        mapsDispatch({ type: 'setPosition', value: newLocation.toJSON() });
      }
    }
  }

  return(
    <div id="pano"></div>
  );
};

export default Pano;
