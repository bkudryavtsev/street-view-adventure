import React, { useContext, useEffect, useState } from 'react';

import { getSessionUsers } from './util/db';

const Results = props => {
  const [users, setUsers] = useState([]);

  const sessionId = (new URLSearchParams(props.location.search)).get('s');

  useEffect(() => {
    if (sessionId) {
      getSessionUsers(sessionId).then(docs => {
        const usersData = docs.map(doc => doc.data());
        setUsers(usersData);
      });
    }
  }, [sessionId]);

  return(
    <div className="results">
      <div style={{ textAlign: 'center' }}>
        <h2>Results</h2>
      </div>
      <ul className="user-list">
        <li className="legend">
          <div></div>
          <div>Score</div>
          <div>Visited</div>
        </li>
        {users.map(user => {
          return(
            <li key={user.id}>
              <div>
                <img src={user.avatar} />
                {user.name}
              </div>
              <div>{user.score}</div>
              <div>{user.locationsVisited}</div>
            </li>
          );
        })}
      </ul>
      <div className="centered-button-container">
        <a href="/start" className="button play">
          <h3>Play again</h3>
        </a>
      </div>
    </div>
  );
};

export default Results;
