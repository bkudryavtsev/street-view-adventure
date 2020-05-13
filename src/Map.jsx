import React, { useContext, useState } from 'react';
import { MapsContext } from './AppContext';

const EXPANDED_HEIGHT = '80%';

const Map = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [initState, setInitState] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  
  const pano = mapsContext.pano;
  const map = mapsContext.map;
  const marker = mapsContext.marker;
    
  if(!initState && mapsContext.isLoaded) {
    map.addListener('click', function(event) {
      marker.setPosition(event.latLng);
      if(!marker.getVisible()) {
        marker.setVisible(true);
        mapsDispatch({ type: 'setMarkerVisible', value: true });
      }
    });

    setInitState(true);
  }

  const onExpandClick = event => {
    setExpanded(!isExpanded);
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
