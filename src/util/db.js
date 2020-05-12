import { randArrEl } from "./math";

export const getRandomLocation = () => {
  const db = firebase.firestore();
  const places = db.collection('places');

  return new Promise((resolve, reject) => {
    places.get().then(res => {
      const countryIds = [];
      res.forEach(doc => countryIds.push(doc.id));

      const randCountry = randArrEl(countryIds);
      const locations = places.doc(randCountry).collection('locations');

      locations.get().then(res => {
        const locIds = [];
        res.forEach(doc => locIds.push(doc.id));
        const randLoc = randArrEl(locIds);

        locations.doc(randLoc).get().then(doc => {
          resolve(doc.data());
        });       
      }).catch(err => reject(err));

    }).catch(err => reject(err));
  });
};
