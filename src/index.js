import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import store from './store'
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';

export const PUBLIC_PATH= process.env.PUBLIC_URL

React.icons = icons
const theme = createTheme({
  palette:{
    primary:{
      main:"#3C4B64"
    },
  },
  // breakpoints: {
  //   values: {
  //     mobile: 425,
  //   },
  // },
});

ReactDOM.render(
  <Provider store={store}>
   <ThemeProvider theme={theme}>
    <App/>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
