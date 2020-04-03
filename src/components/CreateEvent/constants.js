export const MAX_NAME_LEN = 30;
export const MAX_DESCRIPTION_LEN = 120;


export const ERROR_MESSAGES = {
  DEFAULT: '',
  SERVER_ERROR: 'We\'re sorry, the server is not responding right now',

  NAME_OF_EVENT_IS_EMPTY: 'Failed to create event. Event must have a name.',
  DATE_IS_EMPTY: 'Failed to create event. Please enter a date.',
  TIME_START_IS_EMPTY: 'Failed to create event. Please provide the start time of event.',
  TIME_END_IS_EMPTY: 'Failed to create event. Please provide the end time of event',

  NAME_OF_EVENT_IS_TOO_LONG: `Failed to create event. Event must be no longer than ${MAX_NAME_LEN}`,
  DESCRIPTION_IS_TOO_LONG: `Failed to create event. Description must be no longer than ${MAX_DESCRIPTION_LEN}`,

  TIME_END_IS_BEFORE_TIME_START: 'Failed to create event. The event must not end before the start time',

  INVALID_DATE_ENTERED: 'Failed to create event. Please enter a valid date',
  INVALID_TIME_ENTERED: 'Failed to create event. Please enter a valid time',
};
