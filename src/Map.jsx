import React, { useContext, useState } from 'react';
import { MapsContext, AppContext } from './AppContext';

const EXPANDED_HEIGHT = '80%';

const Map = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [appContext, appDispatch] = useContext(AppContext);
  const [isClickListenerSet, setClickListenerState] = useState(false);
  
  const pano = mapsContext.pano;
  const map = mapsContext.map;

  const isExpanded = appContext.isMapExpanded;

  const locationMarker = mapsContext.locationMarker;
  const guessMarker = mapsContext.guessMarker;

  const locations = appContext.locations;
  const currentRound = appContext.currentRound;

  if(mapsContext.isLoaded && appContext.locations.length > 0 && locationMarker) {
    const currLocation = locationMarker.getPosition();
    const newLocation = new google.maps.LatLng(locations[currentRound].latLng);
    if(!currLocation.equals(newLocation)) {
      pano.setPosition(newLocation);
      locationMarker.setPosition(newLocation);
      setClickListenerState(false);
    }
  }
    
  if(!isClickListenerSet && mapsContext.isLoaded) {
    const listener = map.addListener('click', function(event) {
      guessMarker.setPosition(event.latLng);
      if(!guessMarker.getVisible()) {
        guessMarker.setVisible(true);
        mapsDispatch({ type: 'setClickListener', value: listener });
      }
    });

    setClickListenerState(true);
  }

  const onExpandClick = event => {
    appDispatch({ type: 'setMapExpanded', value: !isExpanded });
  };

  return(
    <div className="map-container" style={isExpanded ? { height: `${EXPANDED_HEIGHT}`} : {}}>
      <div className="expand-btn-wrapper">
        <div className="pill-btn" onClick={onExpandClick}>
          {isExpanded ? 'Collapse map' : 'Expand map'}
        </div>
      </div>
      <div id="map"></div>
    </div>
  );
};

export default Map;
