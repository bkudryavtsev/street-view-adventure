import React, { useContext, useState } from 'react';
import { MapsContext } from './AppContext';

const Map = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [initState, setInitState] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState(null);
  const pano = mapsContext.panorama;
  const map = mapsContext.map;
    
  if(!initState && map) {
    let marker = new google.maps.Marker({
      map: map,
      title: 'Place guess',
      visible: false,
      cursor: 'crosshair',
      icon: { 
        url: 'https://i.ibb.co/Wc9YbzS/guessmarker.png',
        scaledSize: new google.maps.Size(28, 28),
        anchor: new google.maps.Point(14, 14)
      }
    });

    map.addListener('click', function(event) {
      marker.setPosition(event.latLng);
      if(!marker.getVisible()) marker.setVisible(true);
      mapsDispatch({ type: 'setGuess', value: marker.getPosition().toJSON() });
    });

    setInitState(true);
  }

  const onExpandClick = event => {
    if(!expandedHeight) {
      setExpandedHeight('80%');
    } else {
      setExpandedHeight(null);
    }
  };

  return(
    <div className="map-container" style={expandedHeight ? { height: `${expandedHeight}`} : {}}>
      <div className="expand-btn-wrapper">
        <div className="pill-btn" onClick={onExpandClick}>
          {expandedHeight ? 'Minimize map' : 'Expand map'}
        </div>
      </div>
      <div id="map"></div>
    </div>
  );
};

export default Map;
