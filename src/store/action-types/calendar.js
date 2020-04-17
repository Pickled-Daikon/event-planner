import { SET_SELECTED_DATE } from '../action-creators/calendar';

export function setSelectedDate(date) {
  return {
    type: SET_SELECTED_DATE,
    payload: date,
  };
}
