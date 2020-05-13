import React, { useContext } from 'react';
import { MapsContext, AppContext } from './AppContext';

const Pano = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [appContext, appDispatch] = useContext(AppContext);

  const pano = mapsContext.pano;
  const locationMarker = mapsContext.locationMarker;

  const locations = appContext.locations;
  const currentRound = appContext.currentRound;

  if(mapsContext.isLoaded && pano && appContext.locations.length > 0 && locationMarker) {
    const currLocation = locationMarker.getPosition();
    const newLocation = new google.maps.LatLng(locations[currentRound].latLng);
    if(!currLocation.equals(newLocation)) {
      pano.setPosition(newLocation);
      locationMarker.setPosition(newLocation);
    }
  }

  return(
    <div id="pano"></div>
  );
};

export default Pano;
