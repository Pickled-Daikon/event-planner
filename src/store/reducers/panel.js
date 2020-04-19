import {
  SET_PANEL,
} from '../action-creators/panel';

const defaultState = {
  getEventsPanel: false,
};

function panelReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_PANEL:
      return { ...state, getEventsPanel: action.payload };
    default:
      return state;
  }
}

export default panelReducer;
