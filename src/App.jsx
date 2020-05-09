import React, { useContext } from 'react';
import { MapsContext } from './AppContext';

import Pano from './Pano';
import Map from './Map';

const App = () => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext); 

  window.initMaps = function() {
    let panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: {lat: 42.345573, lng: -71.098326},
        addressControl: false,
        linksControl: false,
        panControl: false,
        enableCloseButton: false
    });

    let map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 45.0, lng: -25.0 },
      zoom: 1,
      streetViewControl: false
    });

    mapsDispatch({
      type: 'setPanorama',
      value: panorama
    });
    
    mapsDispatch({
      type: 'setMap',
      value: map 
    });

    console.log('Maps loaded');
  }
  
  return ( 
    <div className="app-container">
      <Pano/>
      <Map/>
    </div> 
  );
};

export default App;
