import { combineReducers } from 'redux';
import userReducer from './user';
import eventsReducer from './events';
import calendarReducer from './calendar';
import panelReducer from './panel';


export default combineReducers({
  user: userReducer,
  events: eventsReducer,
  calendar: calendarReducer,
  panel: panelReducer,
});
