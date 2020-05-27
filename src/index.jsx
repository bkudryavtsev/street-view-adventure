import React from 'react';
import ReactDOM from 'react-dom';

import { MapsContextProvider, AppContextProvider } from './AppContext';
import Routes from './Routes';

ReactDOM.render(
  <AppContextProvider>
    <MapsContextProvider>
      <Routes />
    </MapsContextProvider>
  </AppContextProvider>,
  document.getElementById('root'));

