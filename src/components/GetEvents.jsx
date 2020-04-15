import React, { useState } from 'react';
import { Card, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DownloadEventsByDay from './DownloadEventsByDay';

const defaultDate = new Date().getDate().toString();

function GetEvents() {
  // const [date, setDate] = useState(thisdate);

  const events = {
    name: 'Take my dog to work day',
    description: 'It is take my dog to work day',
    location: 'Amazon Headquarters',
    date: '05-07-2020',
    startTime: '9:00',
    endTime: '16:00',
  };

  return (
    <>
      <div className="panelStyle">
        <Header>{defaultDate}</Header>
        <Card>
          <Card.Content>
            <Card.Header textAlign="left">
              {' '}
              {events.name}
            </Card.Header>
            <Card.Meta textAlign="left">
              {events.location}
            </Card.Meta>
            <Card.Description textAlign="left">
              {events.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="left">
            Time:
            {' '}
            {events.startTime}
            {' '}
            -
            {' '}
            {events.endTime}
          </Card.Content>
        </Card>
        <br />
        <DownloadEventsByDay
          events={events}
        />
      </div>
    </>
  );
}

export default GetEvents;
