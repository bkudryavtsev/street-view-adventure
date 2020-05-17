import React from 'react';
import ReactDOM from 'react-dom';

import { MapsContextProvider, 
  AppContextProvider, ThemeContextProvider } from './AppContext';
import Routes from './Routes';

ReactDOM.render(
  <AppContextProvider>
    <MapsContextProvider>
      <ThemeContextProvider>
        <Routes />
      </ThemeContextProvider>
    </MapsContextProvider>
  </AppContextProvider>,
  document.getElementById('root'));

