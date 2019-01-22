import { GET_GENRES_LIST_SUCCESS, GET_GENRES_LIST_FAIL } from '../constants';

export default function runtime(
  state = {
    data: {},
  },
  action,
) {
  switch (action.type) {
    case GET_GENRES_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case GET_GENRES_LIST_FAIL:
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
}
