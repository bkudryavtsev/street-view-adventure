import React, { useContext, useState } from 'react';
import { MapsContext, AppContext } from './AppContext';
import LocationCard from './LocationCard';

const EXPANDED_HEIGHT = '90%';

const Map = props => {
  const [mapsContext, mapsDispatch] = useContext(MapsContext);
  const [appContext, appDispatch] = useContext(AppContext);

  const [currentView, setCurrentView] = useState('guess');
  const [clickListener, setClickListener] = useState(null);
  const [showLocationCard, setShowLocationCard] = useState(false);

  const { isLoaded, pano, map, 
    locationMarker, guessMarker, guessLine } = mapsContext;
  const { isMapExpanded, location, countryDetails, 
    appView, guessDistances, currentRound } = appContext;
  
  if (isLoaded && locationMarker) {
    const currLocation = locationMarker.getPosition();
    const newLocation = new google.maps.LatLng(location.latLng);
    if(!currLocation.equals(newLocation)) {
      pano.setPosition(newLocation);
      locationMarker.setPosition(newLocation);
      setClickListener(null);
    }
  }
    
  if (isLoaded && !clickListener) {
    let listener = map.addListener('click', event => {
      guessMarker.setPosition(event.latLng);
      if(!guessMarker.getVisible()) {
        guessMarker.setVisible(true);
        appDispatch({ type: 'update' });
      }

      setClickListener(listener);
    });
  }

  if (appView !== currentView) {
    switch(appView) {
      case 'guess':
        setCurrentView('guess');
        break;

      case 'guessResult':
        const guessPosition = guessMarker.getPosition().toJSON();
        const locationPosition = locationMarker.getPosition().toJSON();

        locationMarker.setVisible(true);
        
        guessLine.setPath([guessPosition, locationPosition]);
        guessLine.setVisible(true);

        map.panTo(locationPosition);
        map.panBy(-window.innerWidth/10, 0);
        map.setZoom(3);

        google.maps.event.clearListeners(map, 'click');
        setCurrentView('guessResult');
        break;

      case 'loadingMap':
        map.setCenter({ lat: 45.0, lng: -25.0 });
        map.setZoom(2);
        
        guessMarker.setVisible(false);
        guessMarker.setPosition(null);

        locationMarker.setVisible(false);

        guessLine.setVisible(false);
        setCurrentView('loadingMap');
        setShowLocationCard(false);
        break;

      default:
    }
  }

  const onExpandClick = event => {
    if (isMapExpanded) setShowLocationCard(false);
    appDispatch({ type: 'setMapExpanded', value: !isMapExpanded });
  };
  
  if (!showLocationCard && isMapExpanded && currentView === 'guessResult') {
    setTimeout(() => {
      setShowLocationCard(true);
    }, 200);
  }

  return(
    <div className="map-wrapper">
      <div className="map-container" style={isMapExpanded ? { height: `${EXPANDED_HEIGHT}`} : {}}>
        <div className="expand-btn-wrapper">
          <div className="pill-btn" onClick={onExpandClick}>
            {isMapExpanded ? 'Collapse map' : 'Expand map'}
          </div>
        </div>
        {countryDetails && showLocationCard && 
          <div className="location-card-wrapper">
            <LocationCard 
              flagUrl={countryDetails.flag}
              city={location.city}
              country={countryDetails.name}
              guessDistance={guessDistances[currentRound]}
            />
          </div>
        }
        <div id="map"></div>
      </div>
    </div>
  );
};

export default Map;
