import createIcsObj from './createIcsObj';
import * as ics from 'ics';

function downloadSingleIcsEvent(eventObj) {

  const icsObj = createIcsObj(eventObj);

  ics.createEvent(icsObj, (error, fileContents) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    const element = document.createElement('a');
    const file = new Blob([fileContents], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${eventObj.name}.ics`;
    document.body.appendChild(element);
    element.click();
  });
}

export default downloadSingleIcsEvent;
