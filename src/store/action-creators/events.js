import {
  SET_CREATE_EVENT_STATUS,
  SET_CREATE_EVENT_ERROR_MSG,
  SET_CREATED_EVENT,
  SET_ALL_EVENTS,
} from '../action-types/events';


export function setCreateEventStatus(status) {
  return {
    type: SET_CREATE_EVENT_STATUS,
    payload: status,
  };
}

export function setCreateEventErrorMsg(errorMsg) {
  return {
    type: SET_CREATE_EVENT_ERROR_MSG,
    payload: errorMsg,
  };
}

export function setCreatedEvent(event) {
  return {
    type: SET_CREATED_EVENT,
    payload: event,
  };
}

export function setAllEvents(events) {
  return {
    type: SET_ALL_EVENTS,
    payload: events,
  };
}
