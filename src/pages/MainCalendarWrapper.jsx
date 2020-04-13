import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MainCalendar from './MainCalendar';

function MainCalendarWrapper() {
  // hooks
  const userObj = useSelector((state) => state.user);
  // const [showPanel, setShowPanel] = useState(false);
  // const [calendarSize, setCalendarSize] = useState(14);

  // const handleClosePanel = () => {
  //   setShowPanel(false);
  // };

  const handleShowPanel = () => {
    console.log('here');
  }

  if (!userObj.id) {
    return <Redirect to="../" />;
  }


  return (
    <>
      <MainCalendar
        // handleClosePanel={handleClosePanel}
        // handelShowPanel={handleShowPanel}
        // showPanel={showPanel}
        // calendarSize={calendarSize}
      />
    </>
  );
}

export default MainCalendarWrapper;
