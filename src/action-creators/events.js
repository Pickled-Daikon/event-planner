import { SET_CREATE_EVENT_STATUS, SET_CREATE_EVENT_ERROR_MSG } from '../action-types/events';

export function setCreateEventStatus(status) {
  return {
    type: SET_CREATE_EVENT_STATUS,
    payload: status,
  }
}

export function setCreateEventErrorMsg(errorMsg) {
  return {
    type: SET_CREATE_EVENT_ERROR_MSG,
    payload: errorMsg,
  };
}
