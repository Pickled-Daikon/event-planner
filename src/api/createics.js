const ics = require('ics');

// https://www.npmjs.com/package/ics
const example = {
  start: [2020, 3, 13, 10, 0],
  duration: {
    hours: 3,
    minutes: 0,
  },
  title: 'Study for exam',
  description: '',
  location: 'Hamilton Library',
};

ics.createEvent(example, (error, value) => {
  if (error) {
    console.log(error);
  }
  return value;
});

/**
 *
 * @param {{
 *   name: String,
 *   description: String,
 *   startDateTime: String,
 *   endDateTime: String
 * }} eventObject
 */
function createICS(eventObject) {
  const { name, description, startDateTime, endDateTime } = eventObject;

  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  let result = '';


  const icsFile = {
    // eslint-disable-next-line max-len
    start: [start.getFullYear(), (start.getMonth() + 1), start.getDate(), start.getHours(), start.getMinutes()],
    end: [end.getFullYear(), (end.getMonth() + 1), end.getDate(), end.getHours(), end.getMinutes()],
    title: name,
    description,
  };
  ics.createEvent(icsFile, (error, value) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    result = value;
  });
  return result;
}

export default createICS;
