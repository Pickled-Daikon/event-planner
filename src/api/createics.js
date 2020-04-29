import * as ics from 'ics';


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

  const {
    name, description, location, startDateTime, endDateTime,
  } = eventObject;

  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  let result = '';


  const icsFile = {
    // eslint-disable-next-line max-len
    start: [start.getFullYear(), (start.getMonth() + 1), start.getDate(), start.getHours(), start.getMinutes()],
    end: [end.getFullYear(), (end.getMonth() + 1), end.getDate(), end.getHours(), end.getMinutes()],
    title: name,
    description,
    location,
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
