import React, { useState } from 'react';
import {
  Form, Button, Label, Header,
} from 'semantic-ui-react';
import '../style.css';
import Signup from './Signup';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function loggingIn() {
    console.log(email);
    console.log(password);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

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
          <Button onClick={loggingIn}>Log In</Button>
          <Button path="/Signup"> Sign up</Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
