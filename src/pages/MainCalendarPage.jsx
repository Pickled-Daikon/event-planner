import React, { useState, useEffect } from 'react';
import {
  Grid, Icon, Button, Header,
} from 'semantic-ui-react';
import Calendar from '../components/Calendar';
import CreateEvent, { CREATE_EVENT_STATUSES } from '../components/CreateEvent';


function MainCalendarPage() {
  const [createStatus, setCreateStatus] = useState(CREATE_EVENT_STATUSES.DEFAULT);
  // hooks

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
