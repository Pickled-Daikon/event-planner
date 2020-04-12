import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Icon,
  Message,
} from 'semantic-ui-react';
import Calendar from '../components/Calendar';
import CreateEvent from '../components/CreateEvent';
import NavBar from '../components/NavBar';
import '../css/style.css';
import SidePanel from '../components/SidePanel';


// eslint-disable-next-line react/prop-types
function MainCalendar({
}) {
  const [showPanel, setShowPanel] = useState(false);
  // const [calendarSize, setCalendarSize] = useState(6);
  const [panelSize, setPanelSize] = useState(14);


  return (
    <>
      <div className="background">
        <NavBar />
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={4}>
              <Button onClick={() => setShowPanel(true)}>Create Event +</Button>
            </Grid.Column>
            <Grid.Column width={11}>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={15}>
              <SidePanel
                  showPanel={showPanel}
              />
            </Grid.Column>
          </Grid.Row>
          {/*<Grid.Column width={panelSize}>*/}
          {/*  <Button onClick={() => setShowPanel(true)}>Create Event +</Button>*/}
          {/*  <SidePanel*/}
          {/*    showPanel={showPanel}*/}
          {/*  />*/}
          {/*</Grid.Column>*/}
          {/* <Grid.Column */}
          {/*  width={calendarSize} */}
          {/*  style={ */}
          {/*    { */}
          {/*      marginTop: '50px', */}
          {/*      marginRight: '10px', */}
          {/*      marginLeft: '10px', */}
          {/*    } */}
          {/*  } */}
          {/* > */}
          {/*  <Calendar /> */}
          {/* </Grid.Column> */}
        </Grid>
      </div>
    </>
  );
}

export default MainCalendar;
