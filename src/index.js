import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, defaultTokens } from '@faculty/adler-tokens';

import App from './App';

ReactDOM.render(
  <ThemeProvider theme={defaultTokens} >
    <App/>
  </ThemeProvider>,
  document.getElementById('root')
);
