/**
 * Defines controller functions related to events.
 * All functions are async to play nice with model functions.
 */

const Event = require('../models/event');
const { getMissingProps } = require('./helpers');

const modelErrors = Event.eventErrors;

/**
 * Helper function that switches on error type and creates
 * appropriate error message
 * @param {Error} e
 * @return {String} errorMsg
 */
function getErrorMsg(e) {
  switch (e) {
    case (modelErrors.startDateTimeIsNotDate):
      return 'Given startDateTime is not a date';

    case (modelErrors.endDateTimeIsNotDate):
      return 'Given endDateTime is not a date';

    case (modelErrors.create):
      return 'Error creating an event';

    case (modelErrors.fetchAll):
      return 'Error fetching events';

    default:
      return 'Error making request';
  }
}

/**
 * Gets all events.
 *
 * @param req {{}}
 * @param res {{}}
 * @returns {Promise<*>}
 */
async function getEvents(req, res) {
  let events;
  try {
    // get all events
    events = await Event.getAll();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Failed to get events');
    const errMsg = getErrorMsg(e);
    return res.status(400).json({ error: errMsg });
  }
  return res.status(200).json({ events });
}

/**
 * Creates an event.
 * Should be used in a POST request
 * @param req {{
 *   body: {
 *    name: string,
 *    description: string,
 *    location: string,
 *    startDateTime: string,
 *    endDateTime: string
*    }
 *  }}
 * @param res {{}}
 * @returns {Promise<*>}
 */
async function createEvent(req, res) {
  const missingProps = getMissingProps(req.body, [
    'name',
    'description',
    'location',
    'startDateTime',
    'endDateTime',
  ]);

  if (Object.keys(missingProps).length !== 0) {
    return res.status(400).json({
      error: `missing param: ${Object.keys(missingProps)[0]}`,
    });
  }

  const {
    name,
    description,
    location,
    startDateTime,
    endDateTime,
  } = req.body;

  let event;
  try {
    event = await Event.create({
      name,
      description,
      location,
      startDateTime: new Date(startDateTime), // cast to date objects
      endDateTime: new Date(endDateTime),
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Failed to create event');
    // eslint-disable-next-line no-console
    console.log(e);
    const errMsg = getErrorMsg(e);
    return res.status(400).json({ error: errMsg });
  }
  return res.status(200).json({ event });
}

module.exports = {
  getEvents,
  createEvent,
};
