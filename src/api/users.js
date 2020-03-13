import { API_ROOT_URL } from './constants';

export const LOGIN_URL = `${API_ROOT_URL}/users/login`;
export const CREATE_USER_URL = `${API_ROOT_URL}/users/create`;
export const VERIFY_TOKEN_URL = `${API_ROOT_URL}/users/verify`;

export const JWT_TOKEN = 'jwtToken';

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
    throw new Error('Failed to login');
  }

  if (jsonResp.error) {
    throw new Error('Failed to login');
  }

  if (!jsonResp.jwtToken) {
    throw new Error('Failed to login');
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
    throw new Error('Failed to create User');
  }
  if (jsonResp.error) {
    throw new Error('Failed to create user');
  }

  if (!jsonResp.jwtToken) {
    throw new Error('Failed to create user');
  }
  return jsonResp.jwtToken;
}

async function verifyToken() {
  const token = getJwtToken();
  if (!token) {
    throw new Error('verification failed');
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
    throw new Error('Verification failed');
  }

  if (jsonResp.error) {
    throw new Error('Verification failed');
  }

  if (!jsonResp.jwtToken) {
    throw new Error('Verification failed');
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
