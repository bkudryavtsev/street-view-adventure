import React, { useContext } from 'react';
import { MapsContext } from './AppContext';

const App = () => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext); 

  window.initMaps = function() {
    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: {lat: 42.345573, lng: -71.098326},
        addressControl: false,
        linksControl: false,
        panControl: false,
        enableCloseButton: false
    });

    mapsDispatch({
      type: 'setPanorama',
      value: panorama
    });
  }

  if(mapsContext.panorama) {
    mapsContext.panorama.setPosition({lat: 40.729559, lng: -73.990741});
  }
  
  return ( 
    <div className="app-container">
      <div id="pano"></div>
      <div id="map"></div>
    </div> 
  );
};

export default App;
