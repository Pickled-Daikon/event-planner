import React, {useEffect} from 'react';
import {
  Grid,
  Icon,
  Message,
} from 'semantic-ui-react';
import Calendar from '../components/Calendar';
import CreateEvent from '../components/CreateEvent';
import NavBar from '../components/NavBar';
import '../css/style.css';
import {useDispatch} from "react-redux";
import {setCreateEventErrorMsg} from "../store/action-creators/events";


// eslint-disable-next-line react/prop-types
function MainCalendar({
  // eslint-disable-next-line react/prop-types
}) {

  return (
    <>
      <div className="background">
        <NavBar />
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={10}>
            </Grid.Column>
          </Grid.Row>
          <Grid.Column width={4}>
            <CreateEvent>
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

export default MainCalendar;
