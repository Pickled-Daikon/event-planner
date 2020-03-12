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

const NAME = 'name';
const ID = '_id';
const USER_ID = 'userId';
const DESCRIPTION = 'description';
const LOCATION = 'location';
const START_DATE_TIME = 'startDateTime';
const END_DATE_TIME = 'endDateTime';


const KEYS = {
  NAME,
  USER_ID,
  ID,
  DESCRIPTION,
  LOCATION,
  START_DATE_TIME,
  END_DATE_TIME,
};


// mongoose model name.
// we export this in case the document name needs to be referenced
// by other models.
const EVENT = 'Event';


const eventSchema = new mongoose.Schema({
  [NAME]: 'string',
  [USER_ID]: 'string',
  [DESCRIPTION]: 'string',
  [LOCATION]: 'string',
  [START_DATE_TIME]: 'string',
  [END_DATE_TIME]: 'string',
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
 * location: string
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
 * @param {{
 *  name: string,
 *  userId: string,
 *  description: string
 *  location: string,
 *  startDateTime: string,
 *  endDateTime: string,
 *  }} newEventArgs
 * @returns {Promise<*>}
 */
async function create(newEventArgs) {
  // use object destructuring in-case additional args are passed.
  const {
    name,
    userId,
    description,
    location,
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
        userId,
        description,
        location,
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
  ...KEYS,
};
