import createICS from './createics';

function downloadICS(eventObj) {
  const fileContents = createICS(eventObj);
  const element = document.createElement('a');
  const file = new Blob([fileContents], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `${eventObj.name}.ics`;
  document.body.appendChild(element);
  element.click();
}

export default downloadICS;
