import {SET_SELECTED_DATE} from "../action-creators/calendar";

const defaultState = {
  selectedDate: null,
};

export default function calendarReducer(state = defaultState, action) {
  if (action.type === SET_SELECTED_DATE) {
    return { ...defaultState, selectedDate: action.payload };
  }
  return state;
}
