
import React, {useState} from 'react';
import { Form } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

const defaultDate = new Date().getDate().toString();

function Calendar() {
  const [date, setDate] = useState(defaultDate);
  return (
    <DateInput
      inline
      name="date"
      placeholder="Date"
      value={date}
      iconPosition="left"
      onChange={(event, { value }) => setDate(value)}
    />
  );
}

export default Calendar;
