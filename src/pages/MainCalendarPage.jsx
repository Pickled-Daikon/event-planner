import React, { useState } from 'react';
import {
  Grid,
  Icon,
  Button,
  Header,
  Message,
} from 'semantic-ui-react';
import Calendar from '../components/Calendar';
import CreateEvent, { CREATE_EVENT_STATUSES } from '../components/CreateEvent';
import NavBar from "../components/NavBar";

const MESSAGES = {
  CREATE_SUCCESS: 'Event successfully created!',
  CREATE_ERROR: 'We\'re sorry, we are unable to create you\'re event at this time',
};

function MainCalendarPage() {
  const [createStatus, setCreateStatus] = useState(CREATE_EVENT_STATUSES.DEFAULT);
  // hooks


  const currentMsg = createStatus === CREATE_EVENT_STATUSES.ERROR ? MESSAGES.CREATE_ERROR : MESSAGES.CREATE_SUCCESS;

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
      <NavBar />
      <Message
        hidden={createStatus === CREATE_EVENT_STATUSES.DEFAULT}
        error={createStatus === CREATE_EVENT_STATUSES.ERROR}
        success={createStatus === CREATE_EVENT_STATUSES.SUCCESS}
        content={currentMsg}
      />
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={9}>
            <Button>
              <Icon name="angle left icon" />
            </Button>
            <Button>
              Today
            </Button>
            <Button>
              <Icon name="angle right icon" />
            </Button>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header>
              February 2020
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={3}>
            <CreateEvent setCreateSuccess={setCreateStatusHandler}>
              <Icon name="add" />
            </CreateEvent>
          </Grid.Column>
          <Grid.Column width={9}>
            <Calendar />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}


export default MainCalendarPage;
