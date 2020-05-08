import React from 'react';
import ReactDOM from 'react-dom';

import { MapsContextProvider } from './AppContext';
import App from './App';

ReactDOM.render(
  <MapsContextProvider><App /></MapsContextProvider>, 
  document.getElementById('root'));

