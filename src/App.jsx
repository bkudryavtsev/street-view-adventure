import React, { useContext } from 'react';
import { MapsContext, AppContext } from './AppContext';

import Pano from './Pano';
import Map from './Map';
import InfoBar from './InfoBar';

import { nearby } from './util/math';
import { getRandomLocations } from './util/db';

const NUM_LOCATIONS = 2; 

const App = () => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext); 
  const [appContext, appDispatch] = useContext(AppContext);

  window.initMaps = function() {
    getRandomLocations(NUM_LOCATIONS).then(locations => {
      const firstLocation = locations[0].latLng;

      let panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
          position: firstLocation,
          addressControl: false,
          linksControl: false,
          panControl: false,
          enableCloseButton: false,
          fullscreenControl: false
      });

      let map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.0, lng: -25.0 },
        zoom: 2,
        draggableCursor: 'crosshair',
        streetViewControl: false,
        fullscreenControl: false
      });
      
      let guessMarker = new google.maps.Marker({
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
      
      let locationMarker = new google.maps.Marker({
        position: firstLocation, 
        map: map,
        title: 'Actual location',
        visible: false,
        cursor: 'pointer',
        icon: { 
          url: 'https://i.ibb.co/2PR5hMD/guessmarker-actual.png',
          scaledSize: new google.maps.Size(28, 28),
          anchor: new google.maps.Point(14, 14)
        }
      });

      appDispatch({ type: 'setLocations', value: locations });

      mapsDispatch({ type: 'setPano', value: panorama });
      mapsDispatch({ type: 'setMap', value: map });
      mapsDispatch({ type: 'setGuessMarker', value: guessMarker });
      mapsDispatch({ type: 'setLocationMarker', value: locationMarker });

      mapsDispatch({ type: 'setLoaded', value: true });

      console.log('Maps loaded');
    });
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
