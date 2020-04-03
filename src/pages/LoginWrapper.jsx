import React, { useEffect, useState } from 'react';
import {
  Redirect,
} from 'react-router-dom';
import Login from './Login';

import {
  login,
  verifyToken,
  ERROR_TYPES,
  ERRORS,
} from '../api/users';
import { setJwtToken } from '../api/jwt';
import '../css/style.css';


const ERROR_MSGS = {
  SERVER_ERROR: 'We\'re sorry, our servers are not responding.',
  NO_USER_FOUND: 'Login failed: Incorrect email/password',
};

function LoginWrapper() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    verifyToken()
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(() => {});
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    login(email, password)
      .then((jwtToken) => {
        setJwtToken(jwtToken);
        setIsLoggedIn(true);
      }).catch((e) => {
        if (e === ERRORS[ERROR_TYPES.NO_USER_FOUND]) {
          setErrorMsg(ERROR_MSGS.NO_USER_FOUND);
        }
      });
  };
  if (isLoggedIn) {
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
