import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Redirect,
} from 'react-router-dom';

import Login from './Login';

import loginRequest from '../api/users/login';

import '../css/style.css';
import { LOGIN_STATUSES } from "../api/users/constants";


const ERROR_MSGS = {
  SERVER_ERROR: 'We\'re sorry, our servers are not responding.',
  NO_USER_FOUND: 'Login failed: Incorrect email/password',
};

function LoginWrapper() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const userObj = useSelector((state) => state.user);

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
      errorMsg={errorMsg}
      email={email}
      handleEmailChange={handleEmailChange}
      handleLogin={handleLogin}
      password={password}
      handlePassChange={handlePassChange}
    />
  );
}

export default LoginWrapper;
