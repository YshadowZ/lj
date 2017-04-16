import { combineReducers } from 'redux';
import R from 'ramda'
import * as publicReducer from './public';
import * as privateReducer from './private';

export default combineReducers(R.mergeAll([publicReducer, privateReducer]));
