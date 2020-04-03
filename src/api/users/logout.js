import store from '../../store';
import { unsetUser } from '../../action-creators/user';
import { setJwtToken } from "./jwt";

function logout() {
  store.dispatch(unsetUser());
  setJwtToken(null);
}

export default logout;
