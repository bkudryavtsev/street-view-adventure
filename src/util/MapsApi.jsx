import React, { useContext, useEffect } from 'react';
import { MapsContext } from '../AppContext';

const MapsApi = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext); 

  window.initMapsApi = () => {
    mapsDispatch({ type: 'setApiLoaded', value: true });
    console.log('Maps API loaded');
  };

  useEffect(() => {
    const mapsApiScript = document.createElement('script');
    mapsApiScript.type = 'text/javascript';
    mapsApiScript.defer = true;
    mapsApiScript.async = true; 
    mapsApiScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMapsApi`; 

    document.body.appendChild(mapsApiScript);
  }, []);
  
  return null;
};

export default MapsApi;
