/**
  defines functions for the frontend to make requests to the event API.
 */

import { API_ROOT_URL } from './constants';

export const GET_EVENTS_URL = `${API_ROOT_URL}/events/get`;
export const CREATE_EVENT_URL = `${API_ROOT_URL}/events/create`;

const ERRORS = {
  INVALID_NAME: new Error(''),
  INVALID_LOCATION: new Error(''),
  INVALID_START_DT: new Error(''),
  INVALID_END_DT: new Error(''),
};

/**
 * gets all events
 * @returns {Promise<[{
 *   name: String,
 *   description: String,
 *   startDateTime: String,
 *   endDateTime: String
 * }]>}
 */
export async function getAllEvents() {
  let jsonResp;
  try {
    const resp = await fetch(GET_EVENTS_URL);
    jsonResp = await resp.json();
    return jsonResp;
  } catch (e) {
    throw new Error('Failed to fetch events');
  }
}

/**
 *
 * @param eventObj {{
 *   name: String,
 *   description: String,
 *   location: String
 *   startDateTime: String,
 *   endDateTime: String
 * }}
 * @returns {Promise<{
 *   name: String,
 *   description: String,
 *   startDateTime: String,
 *   endDateTime: String
 * }>}
 */
export async function createEvent(eventObj) {
  const {
    name,
    description,
    location,
    startDateTime,
    endDateTime,
  } = eventObj;
  let jsonResp;

  try {
    const resp = await fetch(CREATE_EVENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventObj),
    });

    jsonResp = await resp.json();
    return jsonResp.event;
  } catch (e) {
    throw new Error('Failed to Create event');
  }
}
