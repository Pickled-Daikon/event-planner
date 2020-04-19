import { SET_PANEL } from '../action-creators/panel';

export function setGetEventsPanel(status) {
  return {
    type: SET_PANEL,
    payload: status,
  };
}
