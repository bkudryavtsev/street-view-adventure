import React, { useContext } from 'react';
import { MapsContext } from './AppContext';

const Map = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const map = mapsContext.map;

  if(map) {
    let marker = new google.maps.Marker({
      map: map,
      title: 'Place guess',
      visible: false
    });

    map.addListener('click', function(event) {
      marker.setPosition(event.latLng);
      marker.setVisible(true);
      mapsDispatch({
        type: 'setGuess',
        value: event.latLng
      });
    });
  }

  return(
    <div id="map"></div>
  );
};

export default Map;
