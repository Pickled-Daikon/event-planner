import { API_ROOT_URL } from './constants';

export const LOGIN_URL = `${API_ROOT_URL}/users/login`;
export const CREATE_USER_URL = `${API_ROOT_URL}/users/create`;
export const VERIFY_TOKEN_URL = `${API_ROOT_URL}/users/verify`;

export const JWT_TOKEN = 'jwtToken';

// todo: move Errors to be shared between client/server
export const ERROR_TYPES = {
  UNDEFINED: 'UNDEFINED',
  MISSING_PARAMS: 'MISSING_PARAMS',
  USER_EXISTS: 'USER_EXISTS',
  PW_HASH_FAILED: 'PW_HASH_FAILED',
  INSERT_QUERY_FAILED: 'INSERT_QUERY_FAILED',
  TOKEN_SIGN_FAILED: 'TOKEN_SIGN_FAILED',
  NO_USER_FOUND: 'NO_USER_FOUND',
  PW_COMPARE_FAILED: 'PW_COMPARE_FAILED',
  INVALID_TOKEN: 'INVALID_TOKEN',
};

export const ERRORS = {
  [ERROR_TYPES.UNDEFINED]: new Error('An undefined server error has occurred.'),
  [ERROR_TYPES.MISSING_PARAMS]: new Error('Missing params, make sure email and password is included in post body'),
  [ERROR_TYPES.USER_EXISTS]: new Error('A user with the given email address already exists'),
  [ERROR_TYPES.PW_HASH_FAILED]: new Error('Failed to hash password'),
  [ERROR_TYPES.INSERT_QUERY_FAILED]: new Error('Failed to insert user into the database'),
  [ERROR_TYPES.TOKEN_SIGN_FAILED]: new Error('Failed to tokenize user'),
  [ERROR_TYPES.NO_USER_FOUND]: new Error('No user was found with given email and password'),
  [ERROR_TYPES.PW_COMPARE_FAILED]: new Error('Failed to compare password hash'),
  [ERROR_TYPES.INVALID_TOKEN]: new Error('Invalid Token'),
};


function storeJwtToken(token) {
  localStorage.setItem(JWT_TOKEN, token);
}

function getJwtToken() {
  return localStorage.getItem(JWT_TOKEN);
}

async function login(email, password) {
  let jsonResp;
  try {
    const resp = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    jsonResp = await resp.json();
  } catch (e) {
    throw ERRORS[ERROR_TYPES.UNDEFINED];
  }

  if (jsonResp.error) {
    throw ERRORS[ERROR_TYPES[jsonResp.error]];
  }

  if (!jsonResp.jwtToken) {
    throw ERRORS[ERROR_TYPES.UNDEFINED];
  }
  return jsonResp.jwtToken;
}

async function createUser(userObj) {
  let jsonResp;
  try {
    const resp = await fetch(CREATE_USER_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userObj),
    });
    jsonResp = await resp.json();
  } catch (e) {
    throw ERRORS[ERROR_TYPES.UNDEFINED];
  }
  if (jsonResp.error) {
    throw ERRORS[ERROR_TYPES[jsonResp]];
  }

  if (!jsonResp.jwtToken) {
    throw ERRORS[ERROR_TYPES.UNDEFINED];
  }
  return jsonResp.jwtToken;
}

async function verifyToken() {
  const token = getJwtToken();
  if (!token) {
    throw ERRORS[ERROR_TYPES.INVALID_TOKEN];
  }

  let jsonResp;
  try {
    const resp = await fetch(VERIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        jwtToken: token,
      }),
    });
    jsonResp = await resp.json();
  } catch (e) {
    throw ERRORS[ERROR_TYPES.UNDEFINED];
  }

  if (jsonResp.error) {
    throw ERRORS[ERROR_TYPES[jsonResp.error]];
  }

  if (!jsonResp.jwtToken) {
    throw ERRORS[ERROR_TYPES.UNDEFINED];
  }
  storeJwtToken(jsonResp.jwtToken);
}

export {
  storeJwtToken,
  getJwtToken,
  login,
  createUser,
  verifyToken,
};
