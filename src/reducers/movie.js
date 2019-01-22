import {
  CLEAR_MOVIE,
  GET_MOVIE,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_FAIL,
  GET_SIMILAR_SUCCESS,
  GET_SIMILAR_FAIL,
} from '../constants';

export default function runtime(
  state = {
    loading: true,
    data: {},
    similar: {},
  },
  action,
) {
  switch (action.type) {
    case CLEAR_MOVIE:
      return {
        ...state,
        loading: true,
        data: {},
        similar: {},
      };
    case GET_MOVIE:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case GET_MOVIE_FAIL:
      return {
        ...state,
        loading: false,
        data: {},
      };
    case GET_SIMILAR_SUCCESS:
      return {
        ...state,
        loading: false,
        similar: action.payload.data,
      };
    case GET_SIMILAR_FAIL:
      return {
        ...state,
        loading: false,
        similar: {},
      };
    default:
      return state;
  }
}
