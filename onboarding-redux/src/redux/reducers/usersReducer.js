import * as types from "../actionType";

const initialState = {
  users: [],
  user: {},
  loading: true,
  details: null,
  collections: null,
  status: "idle",
  error: null,
  success: null,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case types.DELETE_USER:
      return state;
    case types.SET_USER_DETAILS:
      state.details = action.payload;
      return state;
    case types.CLEAN_USER_DETAILS:
      state.details = null;
      return state;
    case types.CLEAN_USER:
      state = initialState;
      return state;

    case types.ADD_USER:
    case types.UPDATE_USER:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default usersReducers;
