import {
  GET_MOVIES_LIST,
  GET_MOVIES_LIST_SUCCESS,
  GET_MOVIES_LIST_FAIL,
  SET_SEARCH_TEXT,
} from '../constants';

export default function runtime(
  state = {
    loading: true,
    searchText: '',
    data: {},
  },
  action,
) {
  switch (action.type) {
    case GET_MOVIES_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_MOVIES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case GET_MOVIES_LIST_FAIL:
      return {
        ...state,
        loading: false,
        data: {},
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload.searchText,
      };
    default:
      return state;
  }
}
