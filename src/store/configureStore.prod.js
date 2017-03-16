/**
 * Created by zhaoyan on 17/1/20.
 */
import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}
