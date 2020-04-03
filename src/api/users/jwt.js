import jwtDecode from 'jwt-decode';
import { JWT_TOKEN } from './constants';

export function setJwtToken(token) {
  // eslint-disable-next-line no-undef
  localStorage.setItem(JWT_TOKEN, token);
}

export function getJwtToken() {
  // eslint-disable-next-line no-undef
  return localStorage.getItem(JWT_TOKEN);
}


export function decodeToken(token) {
  return jwtDecode(token);
}
