import {JWT_TOKEN} from './constants';

export function setJwtToken(token) {
  localStorage.setItem(JWT_TOKEN, token);
}

export function getJwtToken() {
  return localStorage.getItem(JWT_TOKEN);
}
