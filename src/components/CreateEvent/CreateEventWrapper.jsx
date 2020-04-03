import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import createICS from '../../api/createics';
import createEventRequest from '../../api/events/createEvent';
import CreateEvent from './CreateEvent';
import eventFieldsErrorCheck from './eventFieldsErrorCheck';
import buildEventObj from './buildEventObj';

const DEFAULT_EVENT_FIELDS = {
  name: '',
  description: '',
  location: '',
  date: '',
  startTime: '',
  endTime: '',
  userId: '',
};

function CreateEventWrapper() {
  const [eventFields, setEventFields] = useState(DEFAULT_EVENT_FIELDS);
  const userObj = useSelector((state) => state.user);

  useEffect(() => {
    setEventFields({ ...eventFields, userId: userObj.id });
  }, [userObj, setEventFields]);
  const eventFieldHandler = (event, { name, value }) => {
    setEventFields({ ...eventFields, [name]: value });
  };

  const onSubmit = () => {
    const fieldError = eventFieldsErrorCheck(eventFields);
    if (fieldError) {
      console.log(fieldError);
      return;
    }

    const eventObj = buildEventObj(eventFields);

    createEventRequest(eventObj);
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
