import React, { useState } from 'react';
import { Button, Card, Header } from 'semantic-ui-react';
import DownloadEventsByDay from './DownloadEventsByDay';
import {useSelector} from "react-redux";
import EventCard from "./EventCard";


function GetEvents() {
  // const [date, setDate] = useState(thisdate);

  const handleDownloadIndividualEvent = () => {
    console.log('Downloading [insert date object here] ');
  };

  const events = useSelector((state) => state.events.allEvents);
  const selectedDate = useSelector((state) => state.calendar.selectedDate);

  let currentEvents = events[selectedDate];
  if (!currentEvents) {
    currentEvents = [];
  }

  console.log(currentEvents);



  return (
    <>
      <div className="panelStyle">
        <Header>{selectedDate}</Header>
        {currentEvents.map((event) => {
          return <EventCard
            event={event}
            key={event.name}
          />
        })}
        <br />
        <DownloadEventsByDay
          events={events}
        />
        <Button onClick={handleDownloadIndividualEvent}>Get event by day</Button>
      </div>
    </>
  );
}

export default GetEvents;
