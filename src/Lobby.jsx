import React, { useContext, useState, useRef, useEffect } from 'react';

import Spinner from './Spinner';

import { AppContext } from './AppContext';

import { createSession, onSessionChange, 
  addSessionUser, onUsersChange, updateSessionParams } from './util/db';
import StartOptions from './StartOptions';

const Lobby = props => {
  const [appContext, appDispatch] = useContext(AppContext);

  const [userId, setUserId] = useState(null);
  const [usersSnapshot, setUsersSnapshot] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [selectedDuration, selectDuration] = useState(null);

  const urlParams = new URLSearchParams(props.location.search);

  const [sessionId, setSessionId] = useState(urlParams.get('s'));
  const [isLoading, setLoading] = useState(false);

  const userNameInputRef = useRef(null);

  useEffect(() => {
    if (sessionId) {
      // listen for changes in the user collection and save the snapshot
      // (e.g. when new users connect)
      const releaseUsersListener = onUsersChange(sessionId, snapshot => 
        setUsersSnapshot(snapshot));

      const releaseSessionListener = onSessionChange(sessionId, snapshot => {
        const data = snapshot.data();
        if (data.duration !== selectedDuration) {
          selectDuration(data.duration);
        }

        if (data.inGame) {
          props.history.replace({
            pathname: '/play',
            search: `?s=${sessionId}`
          });
        } 
      });

      return () => {
        releaseUsersListener();
        releaseSessionListener();
      };
    }
  }, [sessionId]);

  useEffect(() => {
    if (usersSnapshot) {
      let users = [...connectedUsers];

      usersSnapshot.docChanges().forEach(change => {
        switch(change.type) {
          case 'added':
            users.push(change.doc.data());
            break;
          case 'modified':
            const modifiedUser = change.doc.data();
            const idx = users.findIndex(user => user.id === modifiedUser.id);
            users[idx] = modifiedUser;
            break;
          case 'removed':
            const removedUser = change.doc.data();
            users = users.filter(user => user.id !== removedUser.id);
            break;

          default:
        }
      });

      const localUserId = localStorage.getItem('userId');
      
      if (users.find(user => user.id === localUserId)) {
        setUserId(localUserId);
      }

      setConnectedUsers(users);
    }
  }, [usersSnapshot]);

  const onUserCreate = event => {
    event.preventDefault();
    const userName = userNameInputRef.current.value.trim();
    if (!sessionId) {
      setLoading(true);
      createSession(userName).then(res => {
        props.history.replace({
          pathname: props.match.path,
          search: `?s=${res.sessionId}`
        });

        setSessionId(res.sessionId);
        
        localStorage.setItem('userId', res.user.id);
        setUserId(res.user.id);
        
        setLoading(false);
      });
    } else {
      setLoading(true);
      addSessionUser(sessionId, userName).then(user => {
        localStorage.setItem('userId', user.id);
        setUserId(user.id);

        setLoading(false);
      });
    }
  };

  const updateDuration = duration => {
    return updateSessionParams(sessionId, { duration });
  };

  const onPlay = event => {
    return updateSessionParams(sessionId, { inGame: true });
  };

  if (isLoading) {
    return(
      <Spinner />
    );
  }

  if (!userId) {
    return(
      <div className="content centered-vertical">
        <div className="blurb">
          <h3>Find yourself in an unknown place and figure out where you are by navigating around in Google Street View.</h3>
        </div>
        <form className="user-name-form" onSubmit={onUserCreate}>
          <input 
            type="text"
            placeholder="Enter a nickname"
            ref={userNameInputRef} 
            required 
            autoFocus />
          <div className="centered-button-container">
            <button type="submit" className="button play">
              <h3>Start</h3>
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return(
      <div className="content centered-vertical">
        <div className="blurb">
          <p>Share this link to play with your friends</p>
        </div>
        <input
          className="shareable-link"
          type="text" 
          onFocus={event => event.target.select()}
          value={window.location.href} 
          readOnly
          autoFocus>
        </input>
        <ul className="user-list">
          {connectedUsers.map(connectedUser => {
            return(
              <li key={connectedUser.id}>
                <img src={connectedUser.avatar} />
                {connectedUser.name}
              </li>
            );
          })}
        </ul>
        <StartOptions duration={selectedDuration} onDurationChange={updateDuration}/>
        <div className="centered-button-container">
          <a 
            className="button play"
            onClick={onPlay}>
            <h3>Play</h3>
          </a>
        </div>
      </div>
    );
  }
  
};

export default Lobby;
