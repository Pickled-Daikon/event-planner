import { CREATE_USER_ERRORS, CREATE_USER_STATUSES, CREATE_USER_URL } from './constants';
import store from '../../store';
import { setCreateUserErrorMsg, setCreateUserStatus } from '../../store/action-creators/user';

async function createUser(userObj) {
  let jsonResp;
  store.dispatch(setCreateUserStatus(CREATE_USER_STATUSES.PENDING));
  try {
    const resp = await fetch(CREATE_USER_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ user: userObj }),
    });
    jsonResp = await resp.json();
  } catch (e) {
    store.dispatch(setCreateUserStatus(CREATE_USER_STATUSES.FAILED));
    store.dispatch(setCreateUserErrorMsg(CREATE_USER_ERRORS.SERVER_ERROR));
    return;
  }
  if (jsonResp.error) {
    store.dispatch(setCreateUserStatus(CREATE_USER_STATUSES.FAILED));
    store.dispatch(setCreateUserErrorMsg(CREATE_USER_ERRORS.SERVER_ERROR));
    return;
  }

  if (!jsonResp.user) {
    store.dispatch(setCreateUserStatus(CREATE_USER_STATUSES.FAILED));
    store.dispatch(setCreateUserErrorMsg(CREATE_USER_ERRORS.SERVER_ERROR));
    return;
  }

  store.dispatch(setCreateUserStatus(CREATE_USER_STATUSES.SUCCESS));
  store.dispatch(setCreateUserErrorMsg(null));
}

export default createUser;
