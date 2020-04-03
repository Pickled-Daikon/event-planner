import {SET_LOGIN_ERROR_MSG, SET_LOGIN_STATUS, SET_USER, UNSET_USER} from '../action-types/user';

export function setUser(UserObj) {
  return {
    type: SET_USER,
    payload: UserObj,
  };
}

export function unsetUser() {
  return {
    type: UNSET_USER,
  };
}
export function setLoginStatus(loginStatus) {
  return {
    type: SET_LOGIN_STATUS,
    payload: loginStatus,
  };
}

export function setLoginErrorMsg(errorMsg) {
  return {
    type: SET_LOGIN_ERROR_MSG,
    payload: errorMsg,
  };
}

