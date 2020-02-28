import React, { useState, useEffect } from 'react';
import {
  Grid, Icon, Button, Header,
} from 'semantic-ui-react';
import DateTimeForm from '../components/Calendar';
import CreateEvent from '../components/CreateEvent';

function MainCalendarPage() {
  const [createSuccess, setCreateSuccess] = useState(0);
  // hooks

  function addedSuccess(msg) {
    return <h1>msg</h1>;
  }


  useEffect(() => {
    switch (createSuccess) {
      case 0:
        console.log('intial state');
        break;
      case 1:
        console.log('Succesfully added');
        break;
      case 2:
        console.log('Failed to add event');
        break;
      default:
        console.log('Error with switch statement setCreateSuccess int');
        break;
    }
  });


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
            <CreateEvent setCreateSuccess={setCreateSuccess}>
              <Icon name="add" />
            </CreateEvent>
          </Grid.Column>
          <Grid.Column width={9}>
            <DateTimeForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}


export default MainCalendarPage;
