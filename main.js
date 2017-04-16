import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import reducer from './src/reducers'
import config from './routerConfig';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={config} />
  </Provider>,
  document.getElementById('lingjian-app')
);
