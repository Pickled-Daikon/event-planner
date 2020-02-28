const ics = require('ics');

// https://www.npmjs.com/package/ics
const example = {
  start: [2020, 3, 13, 10, 0],
  duration: {
    hours: 3,
    minutes: 0,
  },
  title: 'Study for exam',
  description: '',
  location: 'Hamilton Library',
};

ics.createEvent(example, (error, value) => {
  if (error) {
    console.log(error);
  }
  console.log(value);
});
