/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import moviesApi from '../constants/moviesApi';
import { errorClear, errorSet } from './errors';
import { GET_GENRES_LIST_SUCCESS, GET_GENRES_LIST_FAIL } from '../constants';

export const getGenresSuccess = data => ({
  type: GET_GENRES_LIST_SUCCESS,
  payload: { data },
});

export const getGenresFail = () => ({
  type: GET_GENRES_LIST_FAIL,
});

export function getGenresList(page = 1) {
  return dispatch => {
    dispatch(errorClear());
    return axios({
      url: `${moviesApi.url}/genre/movie/list?page=${page}&api_key=${
        moviesApi.api_key
      }`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        dispatch(getGenresSuccess(response.data.genres));
      })
      .catch(error => {
        dispatch(
          errorSet({
            error,
            message:
              'It is unable to load genres list. Please try again later.',
          }),
        );
        dispatch(getGenresFail());
      });
  };
}
