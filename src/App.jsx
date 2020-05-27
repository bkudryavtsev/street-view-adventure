import React, { useContext, useEffect } from 'react';
import { AppContext, MapsContext } from './AppContext';

import { getNextLocation } from './util/db';

import Pano from './Pano';
import Map from './Map';
import InfoBar from './InfoBar';
import Spinner from './Spinner';

import './styles/app.scss';

const App = () => {
  const [appContext, appDispatch] = useContext(AppContext);
  const [mapsContext, mapsDispatch] = useContext(MapsContext); 

  window.loadMaps = () => {
    getNextLocation().then(location => {
      const panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
          position: location.latLng,
          addressControl: false,
          linksControl: false,
          panControl: false,
          enableCloseButton: false,
          fullscreenControl: false,
          showRoadLabels: false
      });

      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.0, lng: -25.0 },
        zoom: 2,
        draggableCursor: 'crosshair',
        streetViewControl: false,
        fullscreenControl: false
      });
      
      const guessMarker = new google.maps.Marker({
        map: map,
        title: 'Place guess',
        visible: false,
        cursor: 'crosshair',
        icon: { 
          url: 'https://i.ibb.co/RhL43kJ/Guess-Marker.png',
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16)
        }
      });
      
      const locationMarker = new google.maps.Marker({
        position: location.latLng, 
        map: map,
        title: 'Actual location',
        visible: false,
        cursor: 'default',
        icon: { 
          url: 'https://i.ibb.co/HVbnWtx/Location-Marker.png',
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16)
        }
      });

      const lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 2 
      };

      const line = new google.maps.Polyline({
        strokeOpacity: 0,
        icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: '10px'
        }],
        visible: false,
        map: map
      });

      appDispatch({ type: 'setLocation', value: location });

      mapsDispatch({ type: 'setPano', value: panorama });
      mapsDispatch({ type: 'setMap', value: map });
      mapsDispatch({ type: 'setGuessMarker', value: guessMarker });
      mapsDispatch({ type: 'setLocationMarker', value: locationMarker });
      mapsDispatch({ type: 'setGuessLine', value: line });
      
      mapsDispatch({ type: 'setLoaded', value: true });

      console.log('Map/Pano elements loaded');
    });
  };

  useEffect(() => {
    if (mapsContext.isApiLoaded) {
      window.loadMaps();
    }
  }, [mapsContext.isApiLoaded]);
  
  return ( 
    <div className="app-container">
      {!mapsContext.isLoaded && 
        <div className="overlay">
          <Spinner />
        </div>
      }
      <div className="g-container">
        <Pano />
        <Map />
      </div>
      <InfoBar />
    </div> 
  );
};

export default App;
