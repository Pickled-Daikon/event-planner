import React from 'react';
import { Card } from 'semantic-ui-react';
import DownloadEventsByDay from "./DownloadEventsByDay";
import PropTypes from "prop-types";
import CreateEvent from "./CreateEvent/CreateEvent";
import MainCalendar from "../pages/MainCalendar";

const defaultDate = new Date().getDate().toString();

function GetEvents( {handleDownload} ) {
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
        <br/>
        <DownloadEventsByDay floated="right" onClick={handleDownload}/>
      </div>
    </>
  );
}
GetEvents.propTypes = {
  handleDownload: PropTypes.func.isRequired,
};
export default GetEvents;
