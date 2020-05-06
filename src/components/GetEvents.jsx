import React, {useEffect, useState} from 'react';
import { Button, Header } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import DownloadEventsByDay from './DownloadEventsByDay';
import EventCard from './EventCard';
import downloadMultiIcsEvent from "../api/downloadMultiIcsEvent";

function getRelevantDailyEvents(dailyEvents, selectedDate) {
  const events = [];
  const selectedDateObj = new Date(selectedDate);
  dailyEvents.forEach((event) => {
    if (selectedDateObj >= new Date(event.startDateTime)) {
      events.push(event);
    }
  });
  return events;
}

function GetEvents() {
  const events = useSelector((state) => state.events.allEvents);
  const [currentEvents, setCurrentEvents] = useState([]);
  const selectedDate = useSelector((state) => state.calendar.selectedDate);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }
    if (!events || !events.daily) {
      setCurrentEvents([]);
      return;
    }

    let oneTimeEvents = [];

    if (events[selectedDate]) {
      oneTimeEvents = events[selectedDate];
    }

    const dailyEvents = getRelevantDailyEvents(events.daily, selectedDate);

    setCurrentEvents([...oneTimeEvents, ...dailyEvents]);

  }, [events, setCurrentEvents, selectedDate]);


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
