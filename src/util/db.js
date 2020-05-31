import { randArrIdx, nearby } from "./math";

import { durationMap } from './constants';

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

  const avatar = `https://avatars.dicebear.com/api/avataaars/${user.id}.svg?w=128&h=128&style=circle&mode=exclude&top[]=turban&top[]=hijab&topChance=84&accessoriesChance=27&facialHairChance=14&eyes[]=cry&eyes[]=close&mouth[]=vomit&mouth[]=eating&mouth[]=grimace&mouth[]=sad&mouth[]=scream`;

  const userPayload = { 
    id: user.id,
    name: userName,
    host: isHost,
    avatar
  };
  
  return new Promise((resolve, reject) => {
    user.set(userPayload).then(() => {
      resolve(userPayload);
    }).catch(err => reject(err));
  });
};

export const createSession = hostUserName => {
  const db = firebase.firestore();
  const session = db.collection('sessions').doc();
  const sessionId = session.id;

  const defaultDuration = Array.from(durationMap)[0][1];
  const currentDate = new Date();
  const expirationDate = new Date(currentDate.getDate() + 1); // 24 hours

  const initialState = {
    sessionId,
    duration: defaultDuration,
    inGame: false,
    expirationDate: expirationDate.toISOString(),
    gameStartTime: null 
  };

  return new Promise((resolve, reject) => {
    session.set(initialState).then(() => {
      addSessionUser(sessionId, hostUserName, true).then(user => {
        resolve({ user, sessionId });
      });
    }).catch(err => reject(err));
  });
};

export const onSessionChange = (sessionId, callback) => {
  const db = firebase.firestore();
  const session = db.collection('sessions').doc(sessionId); 

  return session.onSnapshot(snapshot => { 
    callback(snapshot);
  });
};

export const updateSessionParams = (sessionId, params) => {
  const db = firebase.firestore();
  const session = db.collection('sessions').doc(sessionId); 

  return session.update(params);
};

export const getSessionParams = sessionId => {
  const db = firebase.firestore();
  const session = db.collection('sessions').doc(sessionId); 
  
  return new Promise((resolve, reject) => {
    session.get()
      .then(doc => {
        if (doc.exists) resolve(doc.data());
        else reject('Session ID does not exist');
      }).catch(err => reject(err));
  });
};

export const getUser = (sessionId, userId) => {
  const db = firebase.firestore();
  const session = db.collection('sessions').doc(sessionId); 
  const users = session.collection('users');
  
  return new Promise((resolve, reject) => {
    users.doc(userId).get()
      .then(doc => {
        if (doc.exists) resolve(doc.data());
        else reject('User ID does not exist in session');
      }).catch(err => reject(err));
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

export const getSessionUsers = sessionId => {
  const db = firebase.firestore();
  const session = db.collection('sessions').doc(sessionId); 
  const users = session.collection('users');

  return new Promise((resolve, reject) => {
    users.get().then(snapshot => {
      resolve(snapshot.docs);
    }).catch(err => reject(err));
  });
};

