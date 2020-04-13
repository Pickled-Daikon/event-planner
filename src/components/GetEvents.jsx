import React, { useState } from 'react';
import { Item, Card } from 'semantic-ui-react';

const defaultDate = new Date().getDate().toString();

function GetEvents() {
  const events = [
    {
      header: 'This is a header',
      description: 'this is a description',
      meta: 'this is meta',
    },
  ];

  return (
    <>
      <div className="panelStyle">
        <Card.Group items={events} />
      </div>
    </>
  );
}

export default GetEvents;
