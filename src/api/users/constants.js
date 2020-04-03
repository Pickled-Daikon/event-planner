import {
  API_ROOT_URL,
  ERRORS as GENERIC_ERRORS,
} from '../constants';

export const LOGIN_URL = `${API_ROOT_URL}/users/login`;
export const CREATE_USER_URL = `${API_ROOT_URL}/users/create`;

export const LOGIN_STATUSES = {
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
};


export const LOGIN_ERRORS = {
  SERVER_ERROR: GENERIC_ERRORS.UNKNOWN_SERVER_ERROR,
};


export const JWT_TOKEN = 'jwtToken';
