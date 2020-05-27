const mapsApiScript = document.createElement('script');
mapsApiScript.type = 'text/javascript';
mapsApiScript.defer = true;
mapsApiScript.async = true; 
mapsApiScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMaps`; 

document.body.appendChild(mapsApiScript);
