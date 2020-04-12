import React, { useState } from 'react';
import {
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';
import CreateEventWrapper from './CreateEvent';
import Calendar from "./Calendar";
import MainCalendar from "../pages/MainCalendar";
import CreateEvent from "./CreateEvent/CreateEvent";


function SidePanel({ showPanel }) {
  // eslint-disable-next-line no-undef
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          onHide={() => setVisible({ showPanel })}
          vertical
          visible={showPanel}
          width="thin"
        >
          <CreateEventWrapper />
        </Sidebar>

        <Sidebar.Pusher>
          <Calendar/>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
}

export default SidePanel;
