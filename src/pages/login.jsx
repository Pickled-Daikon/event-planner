import React, {useEffect, useState} from 'react';
import {login, verifyToken, storeJwtToken} from "../api/users";

import {
  Form,
  Button,
  Label,
  Header,
} from 'semantic-ui-react';
import '../style.css';
import {
  NavLink,
  Redirect,
} from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        storeJwtToken(jwtToken);
        setIsLoggedIn(true);
      }).catch((e) => {
        console.log('login failed');
    });
  };
  if (isLoggedIn) {
    return <Redirect to={'../dashboard'} />;
  }

  return (
    <>
      <div className="loginStyle">
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
