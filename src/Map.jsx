import React, { useContext, useState } from 'react';
import { MapsContext } from './AppContext';

const Map = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [initState, setInitState] = useState(false);
  const map = mapsContext.map;
    
  if(!initState && map) {
    let marker = new google.maps.Marker({
      map: map,
      title: 'Place guess',
      visible: false,
      cursor: 'crosshair',
      icon: { 
        // url: 'https://i.ibb.co/xSdWqK5/guessmarker.png',
        url: 'https://i.ibb.co/stkSW49/guessmarker.png',
        scaledSize: new google.maps.Size(32, 32),
        anchor: new google.maps.Point(16, 16)
      }
    });

    map.addListener('click', function(event) {
      marker.setPosition(event.latLng);
      if(!marker.getVisible()) marker.setVisible(true);
      mapsDispatch({ type: 'setGuess', value: marker.getPosition().toJSON() });
    });

    setInitState(true);
  }

  return(
    <div id="map"></div>
  );
};

export default Map;
