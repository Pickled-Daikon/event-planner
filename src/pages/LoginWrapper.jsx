import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect,
} from 'react-router-dom';

import Login from './Login';

import loginRequest from '../api/users/login';

import '../css/style.css';
import { LOGIN_STATUSES } from '../api/users/constants';
import { setCreateUserErrorMsg, setLoginErrorMsg } from '../store/action-creators/user';
import { setCreateEventErrorMsg } from '../store/action-creators/events';


function LoginWrapper() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userObj = useSelector((state) => state.user);
  const loginErrorMsg = useSelector((state) => state.user.loginErrorMsg);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(setLoginErrorMsg(null)); },
    [email, password]);

  const handleEmailChange = (e) => {
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
