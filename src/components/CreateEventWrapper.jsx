import React, { useState } from 'react';
import PropTypes from 'prop-types';
import createICS from '../api/createics';
import createEvent from '../api/events/createEvent';

import CreateEvent from './CreateEvent';

const ALPHA_WC = /^[a-zA-Z]+$/;

const MAX_NAME_LEN = 30;
const MAX_DESCRIPTION_LEN = 120;


export const ERROR_MESSAGES = {
  DEFAULT: '',
  SERVER_ERROR: 'We\'re sorry, the server is not responding right now',

  NAME_OF_EVENT_IS_EMPTY: 'Failed to create event. Event must have a name.',
  DATE_IS_EMPTY: 'Failed to create event. Please enter a date.',
  TIME_START_IS_EMPTY: 'Failed to create event. Please provide the start time of event.',
  TIME_END_IS_EMPTY: 'Failed to create event. Please provide the end time of event',

  NAME_OF_EVENT_IS_TOO_LONG: `Failed to create event. Event must be no longer than ${MAX_NAME_LEN}`,
  DESCRIPTION_IS_TOO_LONG: `Failed to create event. Description must be no longer than ${MAX_DESCRIPTION_LEN}`,

  TIME_END_IS_BEFORE_TIME_START: 'Failed to create event. The event must not end before the start time',

  INVALID_DATE_ENTERED: 'Failed to create event. Please enter a valid date',
  INVALID_TIME_ENTERED: 'Failed to create event. Please enter a valid time',

};

/**
 *
 * @param {{name, description, location, date, startTime, endTime}} fieldValues
 */
function fieldErrorCheck(fieldValues) {
  // renamed consts since consistent names is causing problems w/ react hooks
  const eName = fieldValues.name;
  const desc = fieldValues.description;
  const eDate = fieldValues.date;
  const loc = fieldValues.location;
  const tStart = fieldValues.startTime;
  const tEnd = fieldValues.endTime;

  /* ****** no empty fields ****** */
  if (eName === '' || !eName) {
    return ERROR_MESSAGES.NAME_OF_EVENT_IS_EMPTY;
  }
  if (eDate === '' || !eDate) {
    return ERROR_MESSAGES.DATE_IS_EMPTY;
  }
  if (tStart === '' || !tStart) {
    return ERROR_MESSAGES.TIME_START_IS_EMPTY;
  }
  if (tEnd === '' || !tEnd) {
    return ERROR_MESSAGES.TIME_END_IS_EMPTY;
  }

  /* ******* EXCEEDED CHAR LIMIT ******* */
  if (eName.length > MAX_NAME_LEN) {
    return ERROR_MESSAGES.NAME_OF_EVENT_IS_TOO_LONG;
  }
  if (desc.length > MAX_DESCRIPTION_LEN) {
    return ERROR_MESSAGES.DESCRIPTION_IS_TOO_LONG;
  }


  /* ******* TIME END BEFORE TIME START ERROR ******* */
  if (tStart.slice(0, 2) > tEnd.slice(0, 2)) {
    return ERROR_MESSAGES.TIME_END_IS_BEFORE_TIME_START;
  }

  /* ******** CHECKING DATE AND TIME FOR INVALID CHARACTERS ******* */
  if (eDate.match(ALPHA_WC)) {
    return ERROR_MESSAGES.INVALID_DATE_ENTERED;
  }
  if (tStart.match(ALPHA_WC) || tEnd.match(ALPHA_WC)) {
    return ERROR_MESSAGES.INVALID_TIME_ENTERED;
  }
  return null;
}

export const CREATE_EVENT_STATUSES = {
  DEFAULT: 0,
  SUCCESS: 1,
  ERROR: 2,
};

const DEFAULT_EVENT_FIELDS = {
  name: '',
  description: '',
  location: '',
  date: '',
  startTime: '',
  endTime: '',
};

function CreateEventWrapper() {
  const [eventFields, setEventFields] = useState(DEFAULT_EVENT_FIELDS);

  const eventFieldHandler = (event, { name, value }) => {
    setEventFields({ ...eventFields, [name]: value });
  };

  const onSubmit = () => {
    const fieldError = fieldErrorCheck(eventFields);
    if (fieldError) {
      console.log(fieldError);
    }

    const dateArr = eventFields.date.split('-');
    const newDate = [dateArr[1], dateArr[0], dateArr[2]].join('-');

    const startDateObj = new Date(newDate);
    const endDateObj = new Date(newDate);

    startDateObj.setMinutes(eventFields.startTime.slice(3, 5));

    endDateObj.setHours(eventFields.endTime.slice(0, 2));
    endDateObj.setMinutes(eventFields.endTime.slice(3, 5));


    const startDateStr = startDateObj.toString();
    const endDateStr = endDateObj.toString();

    createEvent({
      name: eventFields.name,
      description: eventFields.description,
      location: eventFields.location,
      startDateTime: startDateStr,
      endDateTime: endDateStr,
    });
  };

  return (
    <CreateEvent
      eventFields={eventFields}
      eventFieldHandler={eventFieldHandler}
      onSubmit={onSubmit}
    />
  );
}


function downloadIcsFile(eventObj) {
  const fileContents = createICS(eventObj);
  const element = document.createElement('a');
  const file = new Blob([fileContents], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `${eventObj.name}.ics`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

CreateEventWrapper.propTypes = {};

export default CreateEventWrapper;
