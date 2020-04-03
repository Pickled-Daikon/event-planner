import React, { useState } from 'react';
import MainCalendar from './MainCalendar';
import { CREATE_EVENT_STATUSES } from '../components/CreateEvent';

const MESSAGES = {
  CREATE_SUCCESS: 'Event successfully created!',
  CREATE_ERROR: 'We\'re sorry, we are unable to create you\'re event at this time',
};

function MainCalendarWrapper() {
  const [createStatus, setCreateStatus] = useState(CREATE_EVENT_STATUSES.DEFAULT);
  // hooks
  const [errorMsg, setErrorMsg] = useState(null);
  // eslint-disable-next-line max-len
  const currentMsg = createStatus === CREATE_EVENT_STATUSES.ERROR ? errorMsg : MESSAGES.CREATE_SUCCESS;


  const setCreateStatusHandler = (status) => {
    switch (status) {
      case CREATE_EVENT_STATUSES.SUCCESS:
        setCreateStatus(CREATE_EVENT_STATUSES.SUCCESS);
        setTimeout(() => {
          setCreateStatus(CREATE_EVENT_STATUSES.DEFAULT);
        }, 3000);
        break;
      case CREATE_EVENT_STATUSES.ERROR:
        setCreateStatus(CREATE_EVENT_STATUSES.ERROR);
        setTimeout(() => {
          setCreateStatus(CREATE_EVENT_STATUSES.DEFAULT);
        }, 3000);
        break;
      default:
        setCreateStatus(CREATE_EVENT_STATUSES.DEFAULT);
    }
  };

  return (
    <MainCalendar
      createStatus={createStatus}
      currentMsg={currentMsg}
      setCreateStatusHandler={setCreateStatusHandler}
      setErrorMsg={setErrorMsg}
    />
  );
}

export default MainCalendarWrapper;
