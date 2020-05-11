import React from 'react';
import ReactDOM from 'react-dom';

import { MapsContextProvider, 
  AppContextProvider, ThemeContextProvider } from './AppContext';
import App from './App';

ReactDOM.render(
  <AppContextProvider>
    <MapsContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </MapsContextProvider>
  </AppContextProvider>,
  document.getElementById('root'));

