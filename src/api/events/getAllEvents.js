import { getJwtToken } from '../users/jwt';
import store from '../../store';
import { GET_EVENTS_URL } from './constants';
import { setAllEvents } from '../../store/action-creators/events';
import { parse } from 'dotenv';
import getDateString from "./getDateString";

/**
 *
 * @param eventObj {{startDateTime: *, name: *, description: *, location: *, endDateTime: *}}
 */
async function getAllEvents() {
  const jwtToken = getJwtToken();
  const user = store.getState().user;
  let jsonResp = null;

  if (!user) {
    return
  }

  const id = user.id;
  let events = {};
  // no state for sttsu

  try {
    const resp = await fetch(GET_EVENTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authentication: `bearer: ${jwtToken}`,
      },
      body: JSON.stringify({
        userId: id,
      }),
    });
    jsonResp = await resp.json();
    store.dispatch(setAllEvents(jsonResp.events));
  } catch (e) {
    return;
  }

  if (!jsonResp.events) {
    return;
  }
  //get start
  jsonResp.events.forEach((event) => {
    const date = new Date(event.startDateTime);
    const dateWithoutTime = getDateString(date);

    if(events[dateWithoutTime]) {
      events[dateWithoutTime].push(event);
    } else {
      events[dateWithoutTime] = [event];
    }
  })

  store.dispatch(setAllEvents(events));
  //make it an object/
  //call get day
  // add to object
}

export default getAllEvents;
