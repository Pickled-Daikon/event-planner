import jwtDecode from 'jwt-decode';
import { JWT_TOKEN } from './constants';

export function setJwtToken(token) {
  // eslint-disable-next-line no-undef
  localStorage.setItem(JWT_TOKEN, token);
}

export function getJwtToken() {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem(JWT_TOKEN);
  if (token === 'null' || !token) {
    return null;
  }
  return token;
}


export function decodeToken(token) {
  return jwtDecode(token);
}
