import React, { useEffect, useState } from 'react';
import {
  login,
  verifyToken,
  ERROR_TYPES,
  ERRORS,
} from '../api/users';

import {setJwtToken} from "../api/jwt";

import {
  Form,
  Button,
  Label,
  Header,
  Message,
} from 'semantic-ui-react';
import '../style.css';
import {
  NavLink,
  Redirect,
} from 'react-router-dom';

const ERROR_MSGS = {
  SERVER_ERROR: 'We\'re sorry, our servers are not responding.',
  NO_USER_FOUND: 'Login failed: Incorrect email/password',
};

function Login() {
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
    <>
      <div className="loginStyle">
        {
          errorMsg
            ? <Message error>
                {errorMsg}
             </Message>
            : null
        }

        <Form size="small" key="small">
          <Header as="h1">Login Page</Header>
          <Form.Field width={20}>
            <Label>Email</Label>
            <input onChange={handleEmailChange} value={email} placeholder="example@hotmail.com" />
          </Form.Field>
          <Form.Field width={20}>
            <Label>Password</Label>
            <input onChange={handlePassChange} type="password" value={password} placeholder="*********" />
          </Form.Field>
          <Button onClick={handleLogin}>Log In</Button>
          <Button as={NavLink} exact to="/Signup"> Sign up</Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
