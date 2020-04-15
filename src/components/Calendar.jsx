import React, { useState } from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Grid } from 'semantic-ui-react';
import GetEvents from "./GetEvents";

const defaultDate = new Date().getDate().toString();

function Calendar() {
  const [date, setDate] = useState(defaultDate);
  const handleGetDate = () =>
  {
    console.log(date);
  };
  return (
    <>
      <DateInput
        inline
        name="date"
        placeholder="Date"
        value={date}
        iconPosition="left"
        onChange={(event, { value }) => setDate(value)}
      />
      <Button onClick={handleGetDate}></Button>
    </>
  );
}

export default Calendar;
