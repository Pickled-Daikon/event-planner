import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Button,
  Label,
  Header,
  Message,
  Image,
} from 'semantic-ui-react';
import '../css/style.css';

import {
  NavLink,
} from 'react-router-dom';


function Login({
  errorMsg,
  email,
  handleEmailChange,
  password,
  handlePassChange,
  handleLogin,
}) {
  return (
    <>
      <div className="background">
        <div>
          <Header as="h1" className="headerStyle">
            <Image src="https://www.freeiconspng.com/uploads/letter-d-icon-png-28.png" className="headerPic" />
            aikon Calendar
          </Header>
        </div>
        <div className="loginStyle">
          {
          errorMsg
            ? (
              <Message error>
                {errorMsg}
              </Message>
            )
            : null
        }
          <Form size="small" key="small">
            <Form.Field width={20}>
              <Label>Email</Label>
              <input inverted onChange={handleEmailChange} value={email} placeholder="example@hotmail.com" className="loginInputStyle" />
            </Form.Field>
            <Form.Field width={20}>
              <Label>Password</Label>
              <input onChange={handlePassChange} type="password" value={password} placeholder="*********" />
            </Form.Field>
            <Button onClick={handleLogin}>Log In</Button>
            <Button as={NavLink} exact to="/Signup"> Sign up</Button>
          </Form>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePassChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};


export default Login;
