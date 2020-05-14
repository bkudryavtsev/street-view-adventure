import { randArrIdx } from "./math";

export const getRandomLocations = numLocations => {
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

      const locPromises = [];

      for (let i = 0; i < numLocations; i++) {
        const country = countryIds.splice(randArrIdx(countryIds), 1)[0];
        const locations = places.doc(country).collection('locations');

        locPromises.push(new Promise((resolveLoc, rejectLoc) => {
          locations.get().then(res => {
            const allLocations = [];
            let notVisited = [];
            res.forEach(doc => {
              const id = doc.id;
              allLocations.push(id);
              if (!visitedLocations.includes(id)) notVisited.push(id);
            });

            let randLoc = notVisited[randArrIdx(notVisited)];

            // allow selecting a location from allLocations if there are no more locations not visited 
            if (!randLoc) {
              // set this country as visited
              visitedCountries.push(country);
              
              // allLocations to indices from visitedLocations
              const visitedIndices = allLocations.map(loc => 
                visitedLocations.findIndex(visited => visited === loc));
              const firstVisitedIdx = Math.min(...visitedIndices); 
              randLoc = visitedLocations[firstVisitedIdx];
            } else {
              visitedLocations.push(randLoc);
            }

            locations.doc(randLoc).get().then(doc => {
              resolveLoc(doc.data());
            }).catch(err => rejectLoc(err)); 
          }).catch(err => rejectLoc(err));
        }));
      }
      
      Promise.all(locPromises).then(locations => {
        localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
        localStorage.setItem('visitedLocations', JSON.stringify(visitedLocations));
        resolve(locations);
      }).catch(err => reject(err));

    }).catch(err => reject(err));
  });
};
