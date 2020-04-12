import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import createUserRequest from '../api/users/createUser';
import '../css/style.css';
import {
  CREATE_USER_ERROR_MESSAGES,
} from '../api/users/constants';
import Signup from './Signup';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateUserErrorMsg } from '../store/action-creators/user';
import { setCreateEventErrorMsg } from '../store/action-creators/events';

const ALPHA_WC = /^[a-zA-Z]+$/;

const MAX_NAME_LEN = 30;
const MIN_PW_LEN = 6;
// eslint-disable-next-line no-useless-escape
const EMAIL_WC = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;
const PASSWORD_SPECIAL_WC = /.*[!@#$%^&*()_\-+=?/<>;:'"\\|~`.]+.*/;
const PASSWORD_CAPITAL_WC = /.*[A-Z]+.*/;
const PASSWORD_NUMBER_WC = /.*[0-9]+.*/;

/**
 *
 * @param {{firstName, lastName, email, password}} fieldValues
 */
function fieldErrorCheck(fieldValues) {
  // renamed consts since consistent names is causing problems w/ react hooks
  const fName = fieldValues.firstName;
  const lName = fieldValues.lastName;
  const pw = fieldValues.password;
  const mailAddr = fieldValues.email;

  /* ****** first name error checks ****** */
  if (fName === '' || !fName) {
    return CREATE_USER_ERROR_MESSAGES.FIRST_NAME_IS_EMPTY;
  }
  if (fName.length > MAX_NAME_LEN) {
    return CREATE_USER_ERROR_MESSAGES.FIRST_NAME_TOO_LONG;
  }
  // ensure name is for alpha numeric
  if (!fName.match(ALPHA_WC)) {
    return CREATE_USER_ERROR_MESSAGES.FIRST_NAME_INVALID_CHARS;
  }

  /* ****** last name error checks ****** */
  if (lName === '' || !lName) {
    return CREATE_USER_ERROR_MESSAGES.LAST_NAME_IS_EMPTY;
  }
  if (lName.length > MAX_NAME_LEN) {
    return CREATE_USER_ERROR_MESSAGES.LAST_NAME_TOO_LONG;
  }
  // ensure name is for alpha numeric
  if (!lName.match(ALPHA_WC)) {
    return CREATE_USER_ERROR_MESSAGES.LAST_NAME_INVALID_CHARS;
  }

  /* ****** email error checks ******* */
  if (mailAddr === '' || !mailAddr) {
    return CREATE_USER_ERROR_MESSAGES.EMAIL_IS_EMPTY;
  }
  if (!mailAddr.match(EMAIL_WC)) {
    return CREATE_USER_ERROR_MESSAGES.INVALID_EMAIL;
  }

  /* ****** password error checks ****** */
  if (pw.length === '' || !pw) {
    return CREATE_USER_ERROR_MESSAGES.PASSWORD_IS_EMPTY;
  }
  if (pw.length < MIN_PW_LEN) {
    return CREATE_USER_ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }
  if (pw.length > MAX_NAME_LEN) {
    return CREATE_USER_ERROR_MESSAGES.PASSWORD_TOO_LONG;
  }
  if (!pw.match(PASSWORD_SPECIAL_WC)) {
    return CREATE_USER_ERROR_MESSAGES.PASSWORD_MISSING_CHARS;
  }
  if (!pw.match(PASSWORD_CAPITAL_WC)) {
    return CREATE_USER_ERROR_MESSAGES.PASSWORD_MISSING_CHARS;
  }
  if (!pw.match(PASSWORD_NUMBER_WC)) {
    return CREATE_USER_ERROR_MESSAGES.PASSWORD_MISSING_CHARS;
  }
  return null;
}

function SignupWrapper() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const createUserErr = useSelector((state) => state.user.createUserErrorMsg);
  const dispatch = useDispatch();


  const handleSignup = () => {
    const fieldError = fieldErrorCheck({
      firstName,
      lastName,
      email,
      password,
    });
    if (fieldError) {
      dispatch(setCreateUserErrorMsg(fieldError));
      return;
    }
    createUserRequest({
      firstName,
      lastName,
      email,
      password,
      isAdmin: false,
    });
  };

  useEffect(() => { dispatch(setCreateUserErrorMsg(null)); },
    [firstName, lastName, email, password, isLoggedIn]);

  const firstNameChange = (e) => {
    if (errorMsg != null) {
    }
    setFirstName(e.target.value);
  };
  const lastNameChange = (e) => {
    if (errorMsg != null) {
    }
    setLastName(e.target.value);
  };
  const emailChange = (e) => {
    if (errorMsg != null) {
    }
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    if (errorMsg != null) {
    }
    setPassword(e.target.value);
  };

  if (isLoggedIn) {
    return <Redirect to="../" />;
  }
  return (
    <Signup
      createUserErr={createUserErr}
      email={email}
      emailChange={emailChange}
      errorMsg={errorMsg}
      firstName={firstName}
      firstNameChange={firstNameChange}
      handleSignup={handleSignup}
      lastName={lastName}
      lastNameChange={lastNameChange}
      password={password}
      passwordChange={passwordChange}
    />
  );
}

export default SignupWrapper;
