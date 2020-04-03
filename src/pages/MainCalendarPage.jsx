import React, { useState } from 'react';
import {
  Grid,
  Icon,
  Button,
  Header,
  Message,
  Container
} from 'semantic-ui-react';
import Calendar from '../components/Calendar';
import CreateEvent, { CREATE_EVENT_STATUSES, ERROR_MESSAGES } from '../components/CreateEvent';
import NavBar from '../components/NavBar';
import '../css/style.css';


const MESSAGES = {
  CREATE_SUCCESS: 'Event successfully created!',
  CREATE_ERROR: 'We\'re sorry, we are unable to create you\'re event at this time',
};


function MainCalendarPage() {
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

  // eslint-disable-next-line no-console
  console.log(`main calendar createStatus ${createStatus}`);

  // new function that calls setcreatesuccess
  return (
    <>
      <div className="background">
        <NavBar />
        <Message
          hidden={createStatus === CREATE_EVENT_STATUSES.DEFAULT}
          error={createStatus === CREATE_EVENT_STATUSES.ERROR}
          success={createStatus === CREATE_EVENT_STATUSES.SUCCESS}
          content={currentMsg}
        />
        <Grid centered>
          <Grid.Column width={4}>
            <CreateEvent setCreateSuccess={setCreateStatusHandler} setErrMsg={setErrorMsg}>
              <Icon name="add" />
            </CreateEvent>
          </Grid.Column>
          <Grid.Column
            width={10}
            style={
              {
                marginTop: '50px',
                marginRight: '10px',
                marginLeft: '10px',
              }
            }
          >
            <Calendar />
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}


export default MainCalendarPage;
