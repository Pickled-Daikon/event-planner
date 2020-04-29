import * as ics from 'ics';
import createIcs from './createIcsObj';

function downloadMultiIcsEvent(eventObjs, fileName) {
  const icsObjects = eventObjs.map((eventObj) => {
      return createIcs(eventObj);
  });

  ics.createEvents(icsObjects, (error, fileContents) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    const element = document.createElement('a');
    const file = new Blob([fileContents], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName}.ics`;
    document.body.appendChild(element);
    element.click();
  });
}

export default downloadMultiIcsEvent;
