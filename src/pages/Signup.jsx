import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Form,
  Container,
  Segment,
  Grid,
  Header,
  Message, MessageHeader, MessageList, MessageItem,
} from 'semantic-ui-react';
import { createUser } from '../api/users';
import { setJwtToken } from '../api/jwt';
import '../css/style.css';

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
    console.log('special');
    return ERROR_MSGS.PASSWORD_MISSING_CHARS;
  }
  if (!pw.match(PASSWORD_CAPITAL_WC)) {
    console.log('capital');

    return ERROR_MSGS.PASSWORD_MISSING_CHARS;
  }
  if (!pw.match(PASSWORD_NUMBER_WC)) {
    console.log('pw');
    return ERROR_MSGS.PASSWORD_MISSING_CHARS;
  }
  return null;
}

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

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
    createUser({
      firstName,
      lastName,
      email,
      password,
      isAdmin: false,
    }).then((token) => {
      setJwtToken(token);
      setIsLoggedIn(true);
    }).catch(() => {
      setErrorMsg(ERROR_MSGS.SERVER_ERROR);
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
    <>
      <div className="background">
        <Container className="signUpStyle">
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Register your account
              </Header>
              {errorMsg ? <Message error>{errorMsg}</Message> : null}
              <Form onSubmit={handleSignup}>
                <Segment stacked>
                  <Form.Input
                    label="First name"
                    icon="user"
                    value={firstName}
                    iconPosition="left"
                    type="firstName"
                    placeholder="Enter Your First Name"
                    onChange={firstNameChange}
                  />
                  <Form.Input
                    label="Last Name"
                    icon="user"
                    iconPosition="left"
                    value={lastName}
                    placeholder="Enter Your Last Name"
                    type="lastName"
                    onChange={lastNameChange}
                  />
                  <Form.Input
                    label="Email"
                    icon="mail"
                    iconPosition="left"
                    value={email}
                    placeholder="example@hotmail.com"
                    type="email"
                    onChange={emailChange}
                  />
                  <Form.Input
                    label="Password"
                    icon="lock"
                    iconPosition="left"
                    value={password}
                    placeholder="Password"
                    type="password"
                    onChange={passwordChange}
                  />
                  <Message size="tiny">
                    <MessageHeader>Password must contain the following:</MessageHeader>
                    <MessageList>
                      <MessageItem>
                        6 to 16 characters in length
                    </MessageItem>
                      <MessageItem>
                        At least 1 upper case letter
                    </MessageItem>
                      <MessageItem>
                        At least 1 number
                    </MessageItem>
                      <MessageItem>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        At least 1 special character of (!@#$%^&*()_\-+=?/;:'"\\|~`.)
                    </MessageItem>
                    </MessageList>
                  </Message>
                  <Form.Button content="Submit" />
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default Signup;
