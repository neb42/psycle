import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider, defaultTokens } from '@faculty/adler-tokens';

import App from './App';

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
  <ThemeProvider theme={defaultTokens}>
    <React.Fragment>
      <GlobalStyles />
      <App />
    </React.Fragment>
  </ThemeProvider>,
  document.getElementById('root'),
);
