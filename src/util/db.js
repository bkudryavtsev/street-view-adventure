import { randArrIdx } from "./math";

export const getRandomLocations = numLocations => {
  const db = firebase.firestore();
  const places = db.collection('places');

  return new Promise((resolve, reject) => {
    places.get().then(res => {
      const countryIds = [];
      res.forEach(doc => countryIds.push(doc.id));

      const locPromises = [];

      for (let i = 0; i < numLocations; i++) {
        const country = countryIds.splice(randArrIdx(countryIds), 1)[0];
        const locations = places.doc(country).collection('locations');

        locPromises.push(new Promise((resolveLoc, rejectLoc) => {
          locations.get().then(res => {
            const locIds = [];
            res.forEach(doc => locIds.push(doc.id));
            const randLoc = locIds[randArrIdx(locIds)];

            locations.doc(randLoc).get().then(doc => {
              resolveLoc(doc.data());
            }).catch(err => rejectLoc(err)); 
          }).catch(err => rejectLoc(err));
        }));
      }
      
      Promise.all(locPromises).then(locations => {
        resolve(locations);
      }).catch(err => reject(err));

    }).catch(err => reject(err));
  });
};
