
/**
 *
 * @param {{
 *   name: String,
 *   description: String,
 *   startDateTime: String,
 *   endDateTime: String
 * }} eventObject
 */
function createIcsObj(eventObject) {

  const {
    name, description, location, startDateTime, endDateTime,
  } = eventObject;

  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  const icsObject = {
    // eslint-disable-next-line max-len
    start: [start.getFullYear(), (start.getMonth() + 1), start.getDate(), start.getHours(), start.getMinutes()],
    end: [end.getFullYear(), (end.getMonth() + 1), end.getDate(), end.getHours(), end.getMinutes()],
    title: name,
    description,
    location,
  };

  return icsObject;
}

export default createIcsObj;
