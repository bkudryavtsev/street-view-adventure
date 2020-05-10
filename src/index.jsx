import React from 'react';
import ReactDOM from 'react-dom';

import { MapsContextProvider, AppContextProvider } from './AppContext';
import App from './App';

ReactDOM.render(
  <AppContextProvider>
    <MapsContextProvider>
      <App />
    </MapsContextProvider>
  </AppContextProvider>,
  document.getElementById('root'));

