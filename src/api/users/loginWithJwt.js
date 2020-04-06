import { decodeToken, getJwtToken } from './jwt';
import store from '../../store';
import { setLoginStatus, setUser } from '../../store/action-creators/user';
import { LOGIN_STATUSES } from './constants';

export default function loginWithJwt() {
  const jwtToken = getJwtToken();
  if (!jwtToken) {
    store.dispatch(setLoginStatus(LOGIN_STATUSES.FAILED));
    return;
  }
  const decodedToken = decodeToken(jwtToken);
  if (!decodedToken) {
    store.dispatch(setLoginStatus(LOGIN_STATUSES.FAILED));
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
  store.dispatch(setLoginStatus(LOGIN_STATUSES.SUCCESS));

}
