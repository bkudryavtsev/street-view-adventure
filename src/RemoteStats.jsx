import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import { onUsersChange } from './util/db';

const RemoteStats = props => {
  const [appContext, appDispatch] = useContext(AppContext);

  const [users, setUsers] = useState([]);
  const [usersSnapshot, setUsersSnapshot] = useState(null);

  const { sessionParams, userParams } = appContext;
  const { sessionId } = sessionParams;

  useEffect(() => {
    if (sessionId) {
      const releaseUsersListener = onUsersChange(sessionId, snapshot => 
        setUsersSnapshot(snapshot));

      return () => {
        releaseUsersListener();
      };
    }
  }, [sessionId]);

  useEffect(() => {
    if (usersSnapshot) {
      let updatedUsers = [...users];
      usersSnapshot.docChanges().forEach(change => {
        switch(change.type) {
          case 'added':
            updatedUsers.push(change.doc.data());
            break;
          case 'modified':
            const modifiedUser = change.doc.data();
            const idx = users.findIndex(user => user.id === modifiedUser.id);
            updatedUsers[idx] = modifiedUser;
            break;
          default:
        }
      });

      setUsers(updatedUsers);
    }
  }, [usersSnapshot]);

  return(
    <div className="info-bar-stats">
      {users.map(user => {
        return(
          <div className="user" key={user.id}>
            <img src={user.avatar} />
            <p>{user.score > 9999 ? '9999+' : user.score}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RemoteStats;
