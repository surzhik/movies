import { combineReducers } from 'redux';
import movies from './movies';
import movie from './movie';
import genres from './genres';
import runtime from './runtime';
import error from './error';

export default combineReducers({
  movies,
  movie,
  genres,
  error,
  runtime,
});
