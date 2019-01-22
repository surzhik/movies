/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import moviesApi from '../constants/moviesApi';
import { errorClear, errorSet } from './errors';
import {
  GET_MOVIE,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAIL,
  GET_SIMILAR_SUCCESS,
  GET_SIMILAR_FAIL,
  CLEAR_MOVIE,
} from '../constants';

export function clearMovie() {
  return {
    type: CLEAR_MOVIE,
  };
}
export const getMovieStart = () => ({
  type: GET_MOVIE,
});

export const getMovieSuccess = data => ({
  type: GET_MOVIE_SUCCESS,
  payload: { data },
});

export const getMovieFail = () => ({
  type: GET_MOVIE_FAIL,
});

export function getMovie(movieId) {
  return dispatch => {
    dispatch(errorClear());
    dispatch(getMovieStart());
    return axios({
      url: `${moviesApi.url}/movie/${movieId}?api_key=${moviesApi.api_key}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        dispatch(getMovieSuccess(response.data));
      })
      .catch(error => {
        dispatch(
          errorSet({
            error,
            message:
              'It is unable to load movie details. Please try again later.',
          }),
        );
        dispatch(getMovieFail());
      });
  };
}

export const getSimilarSuccess = data => ({
  type: GET_SIMILAR_SUCCESS,
  payload: { data },
});

export const getSimilarFail = () => ({
  type: GET_SIMILAR_FAIL,
});

export function getSimilarMovies(movieId) {
  return dispatch => {
    dispatch(errorClear());
    return axios({
      url: `${moviesApi.url}/movie/${movieId}/recommendations?api_key=${
        moviesApi.api_key
      }`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        dispatch(getSimilarSuccess(response.data));
      })
      .catch(error => {
        dispatch(
          errorSet({
            error,
            message:
              'It is unable to load similar movies. Please try again later.',
          }),
        );
        dispatch(getSimilarFail());
      });
  };
}
