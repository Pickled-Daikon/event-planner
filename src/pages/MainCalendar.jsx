import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Icon,
  Message,
} from 'semantic-ui-react';
import Calendar from '../components/Calendar';
import CreateEvent, { CREATE_EVENT_STATUSES } from '../components/CreateEvent';
import NavBar from '../components/NavBar';
import '../css/style.css';


// eslint-disable-next-line react/prop-types
function MainCalendar({
 createStatus,
 currentMsg,
 setCreateStatusHandler,
  setErrorMsg,
}) {

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

MainCalendar.propTypes = {
  createStatus: PropTypes.string.isRequired,
  currentMsg: PropTypes.string.isRequired,
  setCreateStatusHandler: PropTypes.func.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
};

export default MainCalendar;
