import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider, defaultTokens } from '@faculty/adler-tokens';

import App from './App';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: white;
    user-select: none;
  }
`;

ReactDOM.render(
  <ThemeProvider theme={defaultTokens} >
    <React.Fragment>
      <GlobalStyles />
      <App/>
    </React.Fragment>
  </ThemeProvider>,
  document.getElementById('root')
);
