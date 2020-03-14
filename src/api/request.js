import { getJwtToken } from './jwt';

export const DEFAULT_HEADERS = {
  headers: {
    'content-type': 'application/json',
  },
};

export const ERRORS = {
  NO_TOKEN_FOUND: new Error('no JWT token found'),
};

const DEFAULT_METHOD = 'POST';

export async function request(url, body, headers=DEFAULT_HEADERS, method=DEFAULT_METHOD) {
  if (method === 'POST' && headers['content-type'] === 'application/json') {
    // eslint-disable-next-line no-param-reassign
    body = JSON.stringify(body);
  }

  // eslint-disable-next-line no-undef
  const resp = await fetch(url, {
    method,
    headers,
    body,
  });
  return resp.json();
}

// eslint-disable-next-line max-len
export async function protectedRequest(url, body, headers = DEFAULT_HEADERS, method = DEFAULT_HEADERS) {
  const token = getJwtToken();
  if (!token) {
    throw ERRORS.NO_TOKEN_FOUND;
  }
  const protectedHeaders = {
    ...headers,
    authentication: `Bearer ${token}`,
  };

  return request(url, body, protectedHeaders, method);
}
