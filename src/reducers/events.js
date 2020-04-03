import {SET_CREATE_EVENT_ERROR_MSG, SET_CREATE_EVENT_STATUS, SET_CREATED_EVENT} from '../action-types/events';

const defaultState = {
  createEventStatus: null,
  createEventErrorMsg: null,
  createdEvent: null,
};

function eventsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CREATE_EVENT_STATUS:
      return { ...state, createEventStatus: action.payload };
    case SET_CREATE_EVENT_ERROR_MSG:
      return { ...state, createEventErrorMsg: action.payload };
    case SET_CREATED_EVENT:
      return { ...state, createdEvent: action.payload };
    default:
      return state;
  }
}

export default eventsReducer;
