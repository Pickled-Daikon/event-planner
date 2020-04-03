import { LOGIN_ERRORS, LOGIN_STATUSES, LOGIN_URL } from './constants';
import store from '../../store';
import { setLoginStatus, setLoginErrorMsg, setUser } from '../../action-creators/user';
import {decodeToken, setJwtToken} from './jwt';

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
    store.dispatch(setLoginErrorMsg(LOGIN_ERRORS));
  }

  if (jsonResp.error) {
    store.dispatch(setLoginStatus(LOGIN_STATUSES.FAILED));
    store.dispatch(setLoginErrorMsg(LOGIN_ERRORS.UNKNOWN_SERVER_ERROR));
    return;
  }

  const jwtToken = jsonResp.token;
  if (!jwtToken) {
    store.dispatch(setLoginStatus(LOGIN_STATUSES.FAILED));
    store.dispatch(setLoginErrorMsg(LOGIN_ERRORS.UNKNOWN_SERVER_ERROR));
    return;
  }

  const decodedToken = decodeToken(jwtToken);
  if (!decodedToken) {
    store.dispatch(setLoginStatus(LOGIN_STATUSES.FAILED));
    store.dispatch(setLoginErrorMsg(LOGIN_ERRORS.UNKNOWN_SERVER_ERROR));
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
