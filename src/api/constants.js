export const API_ROOT_URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_API_URL}/api` : '/api';

export const JWT_TOKEN = 'jwtToken';

export const ERRORS = {
  UNKNOWN_SERVER_ERROR: 'UNKNOWN_SERVER_ERROR',
};
