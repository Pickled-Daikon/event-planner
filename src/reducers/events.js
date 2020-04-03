import { SET_CREATE_EVENT_ERROR_MSG, SET_CREATE_EVENT_STATUS } from '../action-types/events';

const defaultState = {
  createEventStatus: null,
  createEventErrorMsg: null,
};

function eventsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CREATE_EVENT_STATUS:
      return { ...state, createEventStatus: action.payload };
    case SET_CREATE_EVENT_ERROR_MSG:
      return { ...state, createEventErrorMsg: action.payload };
    default:
      return state;
  }
}

export default eventsReducer;
