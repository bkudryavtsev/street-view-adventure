import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from './Spinner';

import { AppContext } from './AppContext';

import { createSession, addSessionUser, onUsersChange } from './util/db';

const Lobby = props => {
  const [appContext, appDispatch] = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [sessionId, setSessionId] = useState(props.match.params.sessionId);
  const [isLoading, setLoading] = useState(false);

  const userNameInputRef = useRef(null);

  useEffect(() => {
    if (sessionId) {
      onUsersChange(sessionId, snapshot => {
        const users = [];
        snapshot.forEach(doc => {
          users.push(doc.data());
        });

        setConnectedUsers(users);
      });
    }
  }, [sessionId]);

  const onUserCreate = event => {
    event.preventDefault();
    const userName = userNameInputRef.current.value;
    if (!sessionId) {
      setLoading(true);
      createSession(userName, 5).then(res => {
        setSessionId(res.sessionId);
        setUser(res.user);
        setLoading(false);
      });
    } else {
      setLoading(true);
      addSessionUser(sessionId, userName).then(user => {
        setUser(user);
        setLoading(false);
      });
    }
  };

  if (isLoading) {
    return(
      <Spinner />
    );
  }

  if (!user) {
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
          type="text" 
          onClick={event => {
            event.target.focus();
            event.target.select();
          }}
          value={`localhost:1234/start/lobby/${sessionId}`} 
          readOnly>
        </input>
      </div>
    );
  }
  
};

export default Lobby;
