import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import DownloadEventsByDay from './DownloadEventsByDay';
import EventCard from './EventCard';
import downloadMultiIcsEvent from "../api/downloadMultiIcsEvent";


function GetEvents() {
  // const [date, setDate] = useState(thisdate);


  const events = useSelector((state) => state.events.allEvents);
  const selectedDate = useSelector((state) => state.calendar.selectedDate);

  let currentEvents = [];

  if (!events) {
    currentEvents = [];
  } else if (!selectedDate) {
    currentEvents = [];
  } else if (!events[selectedDate]) {
    currentEvents = [];
  } else {
    currentEvents = events[selectedDate];
  }

  const handleDownloadEventsByDay = () => {
    if (events) {
      downloadMultiIcsEvent(currentEvents, selectedDate);
    }
  };


  return (
    <>
      <div className="panelStyle">
        <Header>{selectedDate}</Header>
        {currentEvents.map((event) => (
          <EventCard
            event={event}
            key={event.name}
          />
        ))}
        <br />
        <DownloadEventsByDay
          events={events}
        />
        <Button onClick={handleDownloadEventsByDay}>Get events by day</Button>
      </div>
    </>
  );
}

export default GetEvents;
