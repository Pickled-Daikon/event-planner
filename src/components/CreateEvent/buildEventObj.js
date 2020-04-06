/**
 * function used to turn the fields from the
 * create event form into an eventObject that
 * can be used to call the createEvent api method.
 *
 * @param eventFields
 * @returns {{startDateTime: *, name: *, description: *, location: *, endDateTime: *, userId: *}}
 */
export default function buildEventObj(eventFields) {
  const dateArr = eventFields.date.split('-');
  const newDate = [dateArr[1], dateArr[0], dateArr[2]].join('-');

  const startDateObj = new Date(newDate);
  const endDateObj = new Date(newDate);

  startDateObj.setMinutes(eventFields.startTime.slice(3, 5));

  endDateObj.setHours(eventFields.endTime.slice(0, 2));
  endDateObj.setMinutes(eventFields.endTime.slice(3, 5));

  const startDateStr = startDateObj.toString();
  const endDateStr = endDateObj.toString();

  return {
    name: eventFields.name,
    userId: eventFields.userId,
    description: eventFields.description,
    location: eventFields.location,
    startDateTime: startDateStr,
    endDateTime: endDateStr,
  };
}
