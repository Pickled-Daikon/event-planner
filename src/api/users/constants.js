import {
  API_ROOT_URL,
  ERRORS as GENERIC_ERRORS,
} from '../constants';

export const LOGIN_URL = `${API_ROOT_URL}/users/login`;
export const CREATE_USER_URL = `${API_ROOT_URL}/users/create`;
const MAX_NAME_LEN = 30;
const MAX_PW_LEN = 16;
const MIN_PW_LEN = 6;

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

  FIRST_NAME_IS_EMPTY: 'Sign up failed. First name cannot be empty.',
  FIRST_NAME_TOO_LONG: `Sign up failed. First name cannot exceed ${MAX_NAME_LEN} characters.`,
  FIRST_NAME_INVALID_CHARS: 'Sign up failed. First name contains invalid characters.',

  LAST_NAME_IS_EMPTY: 'Sign up failed. Last name cannot be empty.',
  LAST_NAME_TOO_LONG: `Sign up failed. Last name cannot exceed ${MAX_NAME_LEN} characters`,
  LAST_NAME_INVALID_CHARS: 'Sign up failed. First name contains invalid characters.',

  EMAIL_IS_EMPTY: 'Sign up failed. Email cannot be empty',
  INVALID_EMAIL: 'Sign up failed. Email is in an invalid format.',

  PASSWORD_IS_EMPTY: 'Sign up failed. Password cannot be empty',
  PASSWORD_TOO_SHORT: `Sign up failed. Password must be at least ${MIN_PW_LEN} characters`,
  PASSWORD_TOO_LONG: `Sign up failed. Password cannot exceed ${MAX_PW_LEN} characters`,
  PASSWORD_MISSING_CHARS: 'Sign up failed. Password must contain 1 upper-case, '
      + '1 lower-case, and 1 special character (,.!@#$).',
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
  USER_NOT_FOUND: 'Email or Password is incorrect.',
  INCORRECT_PW: 'Email or Password is incorrect.',
  CREDENTIALS_MISSING: 'Please enter a Email or Password.',
  SERVER_ERROR: 'Undefined server Error.',
};

export const JWT_TOKEN = 'jwtToken';
