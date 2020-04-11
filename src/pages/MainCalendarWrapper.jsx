import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MainCalendar from './MainCalendar';

const MESSAGES = {
  CREATE_SUCCESS: 'Event successfully created!',
  CREATE_ERROR: 'We\'re sorry, we are unable to create you\'re event at this time',
};

function MainCalendarWrapper() {
  // hooks
  const userObj = useSelector((state) => state.user);
  const errorMsg = useSelector((state) => state.events.createEventErrorMsg);

  if (!userObj.id) {
    return <Redirect to="../" />;
  }

  return (
    <MainCalendar
      errorMsg={errorMsg}
    />
  );
}

export default MainCalendarWrapper;
