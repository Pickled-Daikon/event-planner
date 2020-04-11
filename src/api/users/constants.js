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
export const CREATE_USER_STATUSES = {
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
};

export const CREATE_USER_ERROR_MESSAGES = {
  SERVER_ERROR: 'Undefined server Error.',
  USER_EXISTS: 'Email has already been registered',
};

export const USER_SERVER_ERRORS = {
  SERVER_ERROR: 'Undefined server Error.',
  NEW_USER_MISSING: 'New user object is either missing, '
        + 'missing props, or props have incorrect type in request body.',
  USER_EXISTS: 'A user already exists with given email',
  USER_NOT_FOUND: 'no user was found.',
  CREDENTIALS_MISSING: 'credentials is of incorrect type in request body. object should have email, password',
  INCORRECT_PW: 'Password is incorrect for given email',
};

export const LOGIN_ERROR_MESSAGE ={
  USER_NOT_FOUND: 'User is not registered',
  SERVER_ERROR: 'Undefined server Error.',
};

export const JWT_TOKEN = 'jwtToken';
