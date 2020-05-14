import { randArrIdx } from "./math";

export const getNextLocation = () => {
  const db = firebase.firestore();
  const places = db.collection('places');
  
  let visitedCountries = JSON.parse(localStorage.getItem('visitedCountries')) || [];
  let visitedLocations = JSON.parse(localStorage.getItem('visitedLocations')) || [];

  return new Promise((resolve, reject) => {
    places.get().then(res => {
      // reset if all countries were visited 
      if(visitedCountries.length >= res.size) {
        visitedCountries = [];
        visitedLocations = [];
        console.log('All countries visited');
      }

      const countryIds = [];
      res.forEach(doc => {
        if (!visitedCountries.includes(doc.id)) countryIds.push(doc.id);
      });

      const country = countryIds.splice(randArrIdx(countryIds), 1)[0];
      const locations = places.doc(country).collection('locations');

      locations.get().then(res => {
        const notVisited = [];
        res.forEach(doc => {
          if (!visitedLocations.includes(doc.id)) notVisited.push(doc.id);
        });

        const randLoc = notVisited[randArrIdx(notVisited)];
        visitedLocations.push(randLoc);

        if(notVisited.length === 1) {
          visitedCountries.push(country);
        }

        locations.doc(randLoc).get().then(doc => {
          localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
          localStorage.setItem('visitedLocations', JSON.stringify(visitedLocations));
          resolve(doc.data());
        }).catch(err => reject(err)); 
      }).catch(err => reject(err));
    }).catch(err => reject(err));
  });
};

export const getCountryDetails = country => {
  const db = firebase.firestore();
  const countries = db.collection('countries');

  return new Promise((resolve, reject) => {
    countries.where('code', '==', country).get().then(res => {
      resolve(res.docs[0].data());
    }).catch(err => reject(err));
  });
};
