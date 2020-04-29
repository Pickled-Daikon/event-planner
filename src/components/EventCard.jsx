import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import downloadSingleIcsEvent from '../api/downloadSingleIcsEvent';

export default function EventCard({ event }) {
  const startDate = new Date(event.startDateTime);
  const endDate = new Date(event.endDateTime);

  const startTime = startDate.toLocaleTimeString();
  const endTime = endDate.toLocaleTimeString();


  function handleDownload() {
    downloadSingleIcsEvent(event);
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header textAlign="left">
          {' '}
          {event.name}
        </Card.Header>
        <Card.Meta textAlign="left">
          {event.location}
        </Card.Meta>
        <Card.Description textAlign="left">
          {event.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="left">
        Time:
        {' '}
        {startTime}
        {' '}
        -
        {' '}
        {endTime}
      </Card.Content>
      <Button onClick={handleDownload}>Download Event</Button>
    </Card>
  );
}
