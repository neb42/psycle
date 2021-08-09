import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import { DataContextProvider } from './context/DataContext';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background: linear-gradient(0deg, #12182b 0%, #2f3e70 100%);
    user-select: none;
    font-family: soin_sans_neueroman, sans-serif;
    & button {
      outline-style: none !important;
    }
  }
`;

ReactDOM.render(
  <DataContextProvider>
    <GlobalStyles />
    <App />
  </DataContextProvider>,
  document.getElementById('root'),
);
