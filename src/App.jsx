import React, { useContext } from 'react';
import { MapsContext } from './AppContext';

import Pano from './Pano';
import Map from './Map';
import InfoBar from './InfoBar';

const App = () => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext); 

  window.initMaps = function() {
    const pos = { lat: 42.345573, lng: -71.098326 };

    let panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: pos,
        addressControl: false,
        linksControl: false,
        panControl: false,
        enableCloseButton: false,
        fullscreenControl: false
    });

    let map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 45.0, lng: -25.0 },
      zoom: 1,
      draggableCursor: 'crosshair',
      streetViewControl: false,
      fullscreenControl: false
    });

    mapsDispatch({ type: 'setPosition', value: pos });
    mapsDispatch({ type: 'setPanorama', value: panorama });
    mapsDispatch({ type: 'setMap', value: map });
    mapsDispatch({ type: 'setLoaded', value: true });

    console.log('Maps loaded');
  }
  
  return ( 
    <div className="app-container">
      <Pano />
      <Map />
      <InfoBar />
    </div> 
  );
};

export default App;
