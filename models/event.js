/**
 * Model used as interface to event objects in db.
 *
 * functions defined here are async, and
 * throws errors to top level caller.
 */

const mongoose = require('mongoose');

// errors thrown by functions defined here.
// we export this so that controllers using
// these functions can make decisions based
// on errors thrown.
const eventErrors = {
  fetchAll: new Error('Failed to fetch events'),
  create: new Error('Failed to create event'),
  startDateTimeIsNotDate: new Error('startDateTime is not a Date object'),
  endDateTimeIsNotDate: new Error('endDateTime is not a Date object'),
};

// mongoose model name.
// we export this in case the document name needs to be referenced
// by other models.
const EVENT = 'Event';


const eventSchema = new mongoose.Schema({
  name: 'string',
  description: 'string',
  startDateTime: 'string',
  endDateTime: 'string',
});
const MongooseModel = mongoose.model(EVENT, eventSchema);


/**
 * Returns all documents in event collection as an array of objects.
 *
 * @returns {Promise<[{
 * _.id: string,
 * name: string,
 * date: string,
 * description: string,
 * __v: int
 * }]>}
 */
async function getAll() {
  try {
    return MongooseModel.find();
  } catch (e) {
    throw eventErrors.fetchAll;
  }
}

/**
 * Helper func to check if is date
 * @param {*} date
 *
 * @return {boolean}
 */
function isDate(date) {
  if (!(date instanceof Date)) {
    return false;
  }
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(date)) {
    return false;
  }
  return true;
}


/**
 * @param {{name: string, date: string, description: string}} newEventArgs
 * @returns {Promise<*>}
 */
async function create(newEventArgs) {
  // use object destructuring in-case additional args are passed.
  const {
    name,
    description,
    startDateTime,
    endDateTime,
  } = newEventArgs;

  // throw errors if startDateTime, endDateTime are not Date() objects
  // if (!isDate(startDateTime)) {
  //   throw eventErrors.startDateTimeIsNotDate;
  // }
  //
  // if (!isDate(endDateTime)) {
  //   throw eventErrors.endDateTimeIsNotDate;
  // }

  try {
    const event = new MongooseModel(
      {
        name,
        description,
        startDateTime,
        endDateTime,
      },
    );
    await event.save();
    return event;
  } catch (e) {
    throw eventErrors.create;
  }
}

module.exports = {
  getAll,
  create,
  eventErrors,
  EVENT,
  eventSchema,
};
