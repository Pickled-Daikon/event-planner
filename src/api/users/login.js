import {
  LOGIN_STATUSES, LOGIN_URL, USER_SERVER_ERRORS, LOGIN_ERROR_MESSAGE,
} from './constants';
import store from '../../store';
import { setLoginStatus, setLoginErrorMsg, setUser } from '../../store/action-creators/user';
import { decodeToken, setJwtToken } from './jwt';

export default async function login(email, password) {
  let jsonResp;

  try {
    store.dispatch(setLoginStatus(LOGIN_STATUSES.PENDING));
    // eslint-disable-next-line no-undef
    const resp = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        credentials: {
          email,
          password,
        },
      }),
    });
    jsonResp = await resp.json();
  } catch (e) {
    store.dispatch(setLoginStatus(LOGIN_STATUSES.FAILED));
    store.dispatch(setLoginErrorMsg('Could not connect to the server'));
    return;
  }

  if (jsonResp.error) {
    switch (jsonResp.error) {
      case USER_SERVER_ERRORS.USER_NOT_FOUND:
        store.dispatch(setLoginStatus(LOGIN_STATUSES.FAILED));
        store.dispatch(setLoginErrorMsg(LOGIN_ERROR_MESSAGE.USER_NOT_FOUND));
        return;
      case USER_SERVER_ERRORS.INCORRECT_PW:
        store.dispatch(setLoginStatus(LOGIN_STATUSES.FAILED));
        store.dispatch(setLoginErrorMsg(LOGIN_ERROR_MESSAGE.INCORRECT_PW));
        return;
      case USER_SERVER_ERRORS.CREDENTIALS_MISSING:
        store.dispatch(setLoginStatus(LOGIN_STATUSES.FAILED));
        store.dispatch(setLoginErrorMsg(LOGIN_ERROR_MESSAGE.CREDENTIALS_MISSING));
        return;
      default:
        store.dispatch(setLoginStatus(LOGIN_STATUSES.FAILED));
        store.dispatch(setLoginErrorMsg(LOGIN_ERROR_MESSAGE.SERVER_ERROR));
        return;
    }
  }

  const jwtToken = jsonResp.token;
  if (!jwtToken) {
    store.dispatch(setLoginStatus(LOGIN_STATUSES.FAILED));
    store.dispatch(setLoginErrorMsg(LOGIN_ERROR_MESSAGE.SERVER_ERROR));
    return;
  }

  const decodedToken = decodeToken(jwtToken);
  if (!decodedToken) {
    store.dispatch(setLoginStatus(LOGIN_STATUSES.FAILED));
    store.dispatch(setLoginErrorMsg(LOGIN_ERROR_MESSAGE.SERVER_ERROR));
    return;
  }

  store.dispatch(setUser({
    // eslint-disable-next-line no-underscore-dangle
    id: decodedToken._id,
    firstName: decodedToken.firstName,
    lastName: decodedToken.lastName,
    email: decodedToken.email,
    isAdmin: decodedToken.isAdmin,
  }));
  store.dispatch(setLoginErrorMsg(null));
  store.dispatch(setLoginStatus(LOGIN_STATUSES.SUCCESS));
  setJwtToken(jwtToken);
}
