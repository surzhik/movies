import { GET_MOVIE, GET_MOVIE_SUCCESS, GET_MOVIE_FAIL } from '../constants';

export default function runtime(
  state = {
    loading: true,
    data: {},
  },
  action,
) {
  switch (action.type) {
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

    default:
      return state;
  }
}
