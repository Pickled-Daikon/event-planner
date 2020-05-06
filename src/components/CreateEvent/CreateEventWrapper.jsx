import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import createEventRequest from '../../api/events/createEvent';
import CreateEvent from './CreateEvent';
import eventFieldsErrorCheck from './eventFieldsErrorCheck';
import buildEventObj from './buildEventObj';
import { setCreatedEvent, setCreateEventErrorMsg, setIsRecurring } from '../../store/action-creators/events';
import buildRecurringEvent from './buildRecurringEvent';

const DEFAULT_EVENT_FIELDS = {
  name: '',
  description: '',
  location: '',
  date: '',
  startTime: '',
  endTime: '',
  userId: '',
  recurrenceType: '',
};

const recurringOptions = [
  { value: 'none', text: 'None' },
  { value: 'daily', text: 'Every Day' },
  { value: 'weekly', text: 'Every Week' },
  { value: 'biweekly', text: 'Every Two Weeks' },
  { value: 'monthly', text: 'Every Month' },
  { value: 'yearly', text: 'Every Year' },
];


function CreateEventWrapper() {
  const [eventFields, setEventFields] = useState(DEFAULT_EVENT_FIELDS);
  const userObj = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.events.createEventErrorMsg);
  const recurring = useSelector((state) => state.events.isRecurring);

  useEffect(() => { setCreateEventErrorMsg(null); }, []);

  useEffect(() => {
    setEventFields({ ...eventFields, userId: userObj.id });
  }, [userObj, setEventFields]);
  const eventFieldHandler = (event, { name, value }) => {
    dispatch(setCreateEventErrorMsg(null));
    setEventFields({ ...eventFields, [name]: value });
  };

  const onSubmit = () => {
    const fieldError = eventFieldsErrorCheck(eventFields);
    if (fieldError) {
      console.log(fieldError);
      dispatch(setCreateEventErrorMsg(fieldError));
      return;
    }

    const eventObj = buildEventObj(eventFields);

    createEventRequest(eventObj);
  };

  return (
    <CreateEvent
      errorMsg={errorMsg}
      eventFields={eventFields}
      eventFieldHandler={eventFieldHandler}
      onSubmit={onSubmit}
      recurringOptions={recurringOptions}
    />
  );
}


CreateEventWrapper.propTypes = {};

export default CreateEventWrapper;
