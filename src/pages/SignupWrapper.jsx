import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import createUserRequest from '../api/users/createUser';
import '../css/style.css';

import Signup from './Signup';
import { useSelector } from 'react-redux';

const ALPHA_WC = /^[a-zA-Z]+$/;

const MAX_NAME_LEN = 30;
const MAX_PW_LEN = 16;
const MIN_PW_LEN = 6;
// eslint-disable-next-line no-useless-escape
const EMAIL_WC = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;
const PASSWORD_SPECIAL_WC = /.*[!@#$%^&*()_\-+=?/<>;:'"\\|~`.]+.*/;
const PASSWORD_CAPITAL_WC = /.*[A-Z]+.*/;
const PASSWORD_NUMBER_WC = /.*[0-9]+.*/;


const ERROR_MSGS = {
  SERVER_ERROR: 'A server error has occurred.',

  FIRST_NAME_IS_EMPTY: 'Sign up failed. First name cannot be empty.',
  FIRST_NAME_TOO_LONG: `Sign up failed. First name cannot exceed ${MAX_NAME_LEN} characters.`,
  FIRST_NAME_INVALID_CHARS: 'Sign up failed. First name contains invalid characters.',

  LAST_NAME_IS_EMPTY: 'Sign up failed. Last name cannot be empty.',
  LAST_NAME_TOO_LONG: `Sign up failed. Last name cannot exceed ${MAX_NAME_LEN} characters`,
  LAST_NAME_INVALID_CHARS: 'Sign up failed. First name contains invalid characters.',

  EMAIL_IS_EMPTY: 'Sign up failed. Email cannot be empty',
  INVALID_EMAIL: 'Sign up failed. Email is in an invalid format.',

  PASSWORD_IS_EMPTY: 'Sign up failed. Password cannot be empty',
  PASSWORD_TOO_SHORT: `Sign up failed. Password must be at least ${MIN_PW_LEN} characters`,
  PASSWORD_TOO_LONG: `Sign up failed. Password cannot exceed ${MAX_PW_LEN} characters`,
  PASSWORD_MISSING_CHARS: 'Sign up failed. Password must contain 1 upper-case, '
    + '1 lower-case, and 1 special character (,.!@#$).',
};

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
    return ERROR_MSGS.FIRST_NAME_IS_EMPTY;
  }
  if (fName.length > MAX_NAME_LEN) {
    return ERROR_MSGS.FIRST_NAME_TOO_LONG;
  }
  // ensure name is for alpha numeric
  if (!fName.match(ALPHA_WC)) {
    return ERROR_MSGS.FIRST_NAME_INVALID_CHARS;
  }

  /* ****** last name error checks ****** */
  if (lName === '' || !lName) {
    return ERROR_MSGS.LAST_NAME_IS_EMPTY;
  }
  if (lName.length > MAX_NAME_LEN) {
    return ERROR_MSGS.LAST_NAME_TOO_LONG;
  }
  // ensure name is for alpha numeric
  if (!lName.match(ALPHA_WC)) {
    return ERROR_MSGS.LAST_NAME_INVALID_CHARS;
  }

  /* ****** email error checks ******* */
  if (mailAddr === '' || !mailAddr) {
    return ERROR_MSGS.EMAIL_IS_EMPTY;
  }
  if (!mailAddr.match(EMAIL_WC)) {
    return ERROR_MSGS.INVALID_EMAIL;
  }

  /* ****** password error checks ****** */
  if (pw.length === '' || !pw) {
    return ERROR_MSGS.PASSWORD_IS_EMPTY;
  }
  if (pw.length < MIN_PW_LEN) {
    return ERROR_MSGS.PASSWORD_TOO_SHORT;
  }
  if (pw.length > MAX_NAME_LEN) {
    return ERROR_MSGS.PASSWORD_TOO_LONG;
  }
  if (!pw.match(PASSWORD_SPECIAL_WC)) {
    return ERROR_MSGS.PASSWORD_MISSING_CHARS;
  }
  if (!pw.match(PASSWORD_CAPITAL_WC)) {
    return ERROR_MSGS.PASSWORD_MISSING_CHARS;
  }
  if (!pw.match(PASSWORD_NUMBER_WC)) {
    return ERROR_MSGS.PASSWORD_MISSING_CHARS;
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


  const handleSignup = () => {
    const fieldError = fieldErrorCheck({
      firstName,
      lastName,
      email,
      password,
    });
    if (fieldError) {
      setErrorMsg(fieldError);
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

  const firstNameChange = (e) => {
    if (errorMsg != null) {
      setErrorMsg(null);
    }
    setFirstName(e.target.value);
  };
  const lastNameChange = (e) => {
    if (errorMsg != null) {
      setErrorMsg(null);
    }
    setLastName(e.target.value);
  };
  const emailChange = (e) => {
    if (errorMsg != null) {
      setErrorMsg(null);
    }
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    if (errorMsg != null) {
      setErrorMsg(null);
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
