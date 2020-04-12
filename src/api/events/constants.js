import {
  API_ROOT_URL,
  ERRORS as GENERIC_ERRORS,
} from '../constants';

export const CREATE_EVENT_ERRORS = {
  SERVER_ERROR: GENERIC_ERRORS.UNKNOWN_SERVER_ERROR,
  BAD_EVENT_GIVEN: 'BAD_EVENT_GIVEN',
};

export const CREATE_EVENT_ERROR_MESSAGES = {
  SERVER_ERROR: 'Undefined server Error.',
  BAD_EVENT_GIVEN: 'New event object is either missing, ' +
      'missing props, or props have incorrect type in request body.',
};

export const CREATE_EVENT_STATUSES = {
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
};

export const CREATE_EVENT_URL = `${API_ROOT_URL}/events/create`;
