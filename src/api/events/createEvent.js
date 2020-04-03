import { CREATE_EVENT_URL } from './constants';

/**
 *
 * @param eventObj {{startDateTime: *, name: *, description: *, location: *, endDateTime: *}}
 * @returns {Promise<{
 *   name: String,
 *   description: String,
 *   startDateTime: String,
 *   endDateTime: String
 * }>}
 */
async function createEvent(eventObj) {
  let jsonResp;
  try {
    const resp = await fetch(CREATE_EVENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: eventObj,
      }),
    });

    jsonResp = await resp.json();
    return jsonResp.event;
  } catch (e) {
    throw new Error('Failed to Create event');
  }
}

export default createEvent;
