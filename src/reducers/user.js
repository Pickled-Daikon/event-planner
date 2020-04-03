import {
  SET_USER,
  SET_LOGIN_ERROR_MSG,
  SET_LOGIN_STATUS,
  UNSET_USER,
  SET_CREATE_USER_STATUS, SET_CREATE_USER_ERROR_MSG
} from '../action-types/user';

const defaultState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  isAdmin: null,
  loginErrorMsg: null,
  loginStatus: null,
  createUserStatus: null,
  createUserErrorMsg: null,
};

function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };

    case SET_LOGIN_ERROR_MSG:
      return { ...state, loginErrorMsg: action.payload };

    case SET_LOGIN_STATUS:
      return { ...state, loginStatus: action.payload };

    case UNSET_USER:
      return defaultState;

    case SET_CREATE_USER_STATUS:
      return { ...state, createUserStatus: action.payload };

    case SET_CREATE_USER_ERROR_MSG:
      return { ...state, createUserErrorMsg: action.payload };

    default:
      return state;
  }
}

export default userReducer;
