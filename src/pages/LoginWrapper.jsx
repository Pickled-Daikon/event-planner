import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Redirect,
} from 'react-router-dom';

import Login from './Login';

import loginRequest from '../api/users/login';

import '../css/style.css';
import { LOGIN_STATUSES } from '../api/users/constants';
import {setCreateUserErrorMsg, setLoginErrorMsg} from '../store/action-creators/user';


function LoginWrapper() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userObj = useSelector((state) => state.user);
  const loginErrorMsg = useSelector((state) => state.user.loginErrorMsg);
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    if (loginErrorMsg != null) {
      dispatch(setLoginErrorMsg(null));
    }
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    loginRequest(email, password);
  };

  if (userObj.loginStatus === LOGIN_STATUSES.SUCCESS && userObj.id) {
    return <Redirect to="../dashboard" />;
  }

  return (
    <Login
      loginErrorMsg={loginErrorMsg}
      email={email}
      handleEmailChange={handleEmailChange}
      handleLogin={handleLogin}
      password={password}
      handlePassChange={handlePassChange}
    />
  );
}

export default LoginWrapper;
