import { combineReducers } from 'redux';
import movies from './movies';
import runtime from './runtime';

export default combineReducers({
  movies,
  runtime,
});
