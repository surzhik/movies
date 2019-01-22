import {
  GET_MOVIES_LIST,
  GET_MOVIES_LIST_SUCCESS,
  GET_MOVIES_LIST_FAIL,
} from '../constants';

export default function runtime(
  state = {
    loading: true,
    data: {},
    error: null,
  },
  action,
) {
  switch (action.type) {
    case GET_MOVIES_LIST:
      return {
        ...state,
        loading: true,
        data: {},
        error: null,
      };
    case GET_MOVIES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case GET_MOVIES_LIST_FAIL:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload.error,
      };
    default:
      return state;
  }
}
