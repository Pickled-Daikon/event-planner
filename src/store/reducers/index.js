import { combineReducers } from 'redux';
import userReducer from './user';
import eventsReducer from './events';
import calendarReducer from './calendar';


export default combineReducers({
  user: userReducer,
  events: eventsReducer,
  calendar: calendarReducer,
});
