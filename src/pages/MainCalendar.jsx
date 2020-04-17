import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Icon, Menu,
  Message, Segment, Sidebar,
} from 'semantic-ui-react';
import Calendar from '../components/Calendar';
import NavBar from '../components/NavBar';
import '../css/style.css';
import CreateEventWrapper from '../components/CreateEvent/CreateEventWrapper';
// eslint-disable-next-line import/order
import PropTypes from 'prop-types';
import GetEvents from '../components/GetEvents';
import getAllEvents from '../api/events/getAllEvents';


// eslint-disable-next-line react/prop-types
function MainCalendar({
  // handleClosePanel,
  // handleShowPanel,
  // showPanel,
  // calendarSize,
}) {
  const [showPanelCreate, setShowPanelCreate] = useState(false);
  const [showPanelGetEvents, setShowPanelGetEvents] = useState(false);
  const [calendarSize, setCalendarSize] = useState(15);
  const [buttonSize, setButtonSize] = useState(3);

  const handleGetEventsPanel = () => {
    setShowPanelGetEvents(true);
    setShowPanelCreate(false);
    setCalendarSize(11);
    setButtonSize(1);
  };

  const handleClosePanel = () => {
    setShowPanelCreate(false);
    setShowPanelGetEvents(false);
    setCalendarSize(15);
    setButtonSize(3);
  };

  const handleShowPanel = () => {
    setShowPanelCreate(true);
    setShowPanelGetEvents(false);
    setCalendarSize(11);
    setButtonSize(1);
  };

  getAllEvents();

  return (
    <>
      <NavBar />

      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
              // onHide={() => setVisible({ showPanel })}
          vertical
          visible={showPanelCreate}
          width="wide"
        >
          <Button compact basic icon="window close" onClick={handleClosePanel} floated="right" size="small" />
          <CreateEventWrapper />
        </Sidebar>
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          width="wide"
          vertical
          visible={showPanelGetEvents}
        >
          <Button compact basic icon="window close" onClick={handleClosePanel} floated="right" size="small" />
          <GetEvents />
        </Sidebar>

        <Sidebar.Pusher>
          <div className="background">
            <Grid>
              <Grid.Row>
                <Grid.Column width={buttonSize}>
                  <Button onClick={handleShowPanel}>createevents</Button>
                  <Button onClick={handleGetEventsPanel}>getevents</Button>
                </Grid.Column>
                <Grid.Column width={11}>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={calendarSize}>
                  <Calendar />
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
}

MainCalendar.propTypes = {
  handleClosePanel: PropTypes.func.isRequired,
  showPanel: PropTypes.bool.isRequired,
  calendarSize: PropTypes.number.isRequired,
  handleShowPanel: PropTypes.func.isRequired,
};


export default MainCalendar;
