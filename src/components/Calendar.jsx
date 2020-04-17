import React, { useState } from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import getDateString from "../api/events/getDateString";
import {setSelectedDate} from "../store/action-types/calendar";


const defaultDate = new Date().getDate().toString();

function Calendar() {

  const date = useSelector((state) => state.calendar.selectedDate);
  const dispatch = useDispatch();

  const dateHandler = (event, { value }) => {
    const [day, month, year] = value.split('-');
    const dateObj = new Date();
    dateObj.setFullYear(year);
    dateObj.setMonth(parseInt(month) - 1);
    dateObj.setDate(day);
    const dateStr = getDateString(dateObj);
    dispatch(setSelectedDate(dateStr));
  };

  return (
    <>
      <DateInput
        inline
        name="date"
        placeholder="Date"
        value={date}
        iconPosition="left"
        onChange={dateHandler}
      />
    </>
  );
}

export default Calendar;
