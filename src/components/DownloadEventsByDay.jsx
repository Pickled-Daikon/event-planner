import React from 'react';
import { Button } from 'semantic-ui-react';


function DownloadEventsByDay() {
  const handleDownload = () => {
    console.log('downloading events by day');
  };

  return (
    <>
      <Button onClick={handleDownload}> Export </Button>
    </>
  );
}

export default DownloadEventsByDay;
