import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import { getSessionUsers } from './util/db';

const RemoteStats = props => {
  const [appContext, appDispatch] = useContext(AppContext);

  const [users, setUsers] = useState([]);

  const { sessionParams, userParams } = appContext;
  const { sessionId } = sessionParams;

  useEffect(() => {
    if (sessionId) {
      getSessionUsers(sessionId).then(docs => {
        const usersData = docs.map(userDoc => userDoc.data());
        setUsers(usersData);
      });
    }
  }, [sessionId]);

  return(
    <div className="info-bar-stats">
      {users.map(user => {
        return(
          <div className="user" key={user.id}>
            <img src={user.avatar} />
            <p>{user.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RemoteStats;
