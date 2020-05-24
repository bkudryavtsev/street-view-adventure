import { randArrIdx, weightedRandom, nearby } from "./math";

const LOCATION_RADIUS = 300; // meters
const SEARCH_RADIUS = 500; // meters

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
          const sv = new google.maps.StreetViewService();
          const location = doc.data();
          location.latLng = nearby(location.latLng, LOCATION_RADIUS);
          sv.getPanorama({
            location: location.latLng, 
            radius: SEARCH_RADIUS
          }, (data, status) => {
            if (status === 'OK') {
              location.latLng = data.location.latLng.toJSON();

              localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
              localStorage.setItem('visitedLocations', JSON.stringify(visitedLocations));
              
              resolve(location);
            } else {
              reject('Could not get panorama');
            }
          });
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

export const addSessionUser = (sessionId, userName, isHost = false) => {
  const db = firebase.firestore();
  const session = db.collection('sessions').doc(sessionId); 
  const user = session.collection('users').doc(); 

  const userPayload = { 
    id: user.id,
    name: userName,
    host: isHost,
    avatar: `https://avatars.dicebear.com/api/avataaars/${user.id}.svg`
  };
  
  return new Promise((resolve, reject) => {
    user.set(userPayload).then(() => {
      resolve(userPayload);
    }).catch(err => reject(err));
  });
};

export const createSession = (hostUserName, duration) => {
  const db = firebase.firestore();
  const session = db.collection('sessions').doc();
  const sessionId = session.id;

  return new Promise((resolve, reject) => {
    session.set({ sessionId, duration }).then(() => {
      addSessionUser(sessionId, hostUserName, true).then(user => {
        resolve({ user, sessionId });
      });
    }).catch(err => reject(err));
  }).catch(err => reject(err));
};

export const onSessionChange = (sessionId, callback) => {
  const db = firebase.firestore();
  const session = db.collection('sessions').doc(sessionId); 

  return session.onSnapshot(snapshot => { 
    callback(snapshot);
  });
};

export const onUsersChange = (sessionId, callback) => {
  const db = firebase.firestore();
  const session = db.collection('sessions').doc(sessionId); 
  const users = session.collection('users');

  return users.onSnapshot(snapshot => {
    callback(snapshot);
  });
};

