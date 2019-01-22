/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import moviesApi from '../constants/moviesApi';
import {
  GET_MOVIES_LIST,
  GET_MOVIES_LIST_SUCCESS,
  GET_MOVIES_LIST_FAIL,
} from '../constants';

export const getMoviesStart = () => ({
  type: GET_MOVIES_LIST,
});

export const getMoviesSuccess = data => ({
  type: GET_MOVIES_LIST_SUCCESS,
  payload: { data },
});

export const getMoviesFail = error => ({
  type: GET_MOVIES_LIST_FAIL,
  payload: { error },
});

export function getMoviesList(page = 1) {
  return dispatch => {
    dispatch(getMoviesStart());
    return axios({
      url: `${moviesApi.url}/movie/popular?page=${page}&api_key=${
        moviesApi.api_key
      }`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        dispatch(getMoviesSuccess(response.data));
      })
      .catch(error => {
        dispatch(getMoviesFail(error));
      });
  };
}
