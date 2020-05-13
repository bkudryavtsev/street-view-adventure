import React, { useContext, useState } from 'react';
import { MapsContext, AppContext } from './AppContext';

const EXPANDED_HEIGHT = '80%';

const Map = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [appContext, appDispatch] = useContext(AppContext);
  const [initState, setInitState] = useState(false);
  
  const pano = mapsContext.pano;
  const map = mapsContext.map;
  const guessMarker = mapsContext.guessMarker;

  const isExpanded = appContext.isMapExpanded;
    
  if(!initState && mapsContext.isLoaded) {
    map.addListener('click', function(event) {
      guessMarker.setPosition(event.latLng);
      if(!guessMarker.getVisible()) {
        guessMarker.setVisible(true);
        mapsDispatch({ type: 'setGuessMarkerVisible', value: true });
      }
    });

    setInitState(true);
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
