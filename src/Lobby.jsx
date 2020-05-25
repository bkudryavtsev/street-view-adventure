import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Spinner from './Spinner';

import { AppContext } from './AppContext';

import { createSession, addSessionUser, onUsersChange } from './util/db';

const Lobby = props => {
  const [appContext, appDispatch] = useContext(AppContext);

  const [userId, setUserId] = useState(null);
  const [usersSnapshot, setUsersSnapshot] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);

  const urlParams = new URLSearchParams(props.location.search);

  const [sessionId, setSessionId] = useState(urlParams.get('s'));
  const [isLoading, setLoading] = useState(false);

  const userNameInputRef = useRef(null);

  useEffect(() => {
    if (sessionId) {
      // listen for changes in the user collection and save the snapshot
      // (in case new users connect)
      onUsersChange(sessionId, snapshot => setUsersSnapshot(snapshot));
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
    const userName = userNameInputRef.current.value;
    if (!sessionId) {
      setLoading(true);
      createSession(userName, 5).then(res => {
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

  if (isLoading) {
    return(
      <Spinner />
    );
  }

  if (!userId) {
    return(
      <div>
        <form onSubmit={onUserCreate}>
          <input type="text" placeholder="Enter a nickname" ref={userNameInputRef}/>
          <input type="submit" value="Enter lobby" />
        </form>
      </div>
    );
  } else {
    return(
      <div>
        <ul>
          {connectedUsers.map(connectedUser => {
            return(
              <li key={connectedUser.id}>
                <img src={connectedUser.avatar} />
                {connectedUser.name}
              </li>
            );
          })}
        </ul>
        <input
          className="shareable-link"
          type="text" 
          onClick={event => {
            event.target.focus();
            event.target.select();
          }}
          value={window.location.href} 
          readOnly>
        </input>
      </div>
    );
  }
  
};

export default Lobby;
