import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
// import { Provider } from 'react-redux';
// import DevTools from './reduxDevTools';
// import configureStore from './src/store/configureStore';
import config from './routerConfig';

// const store = configureStore();

ReactDOM.render(
  <div>
    <Router history={hashHistory} routes={config} />
  </div>,
  document.getElementById('lingjian-app')
);
