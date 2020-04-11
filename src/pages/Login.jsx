import React from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Button,
  Label,
  Header,
  Message,
  Image,
  Grid,
} from 'semantic-ui-react';
import '../css/style.css';

import {
  NavLink,
} from 'react-router-dom';


function Login({
  // eslint-disable-next-line react/prop-types
  loginErrorMsg,
  email,
  handleEmailChange,
  password,
  handlePassChange,
  handleLogin,
}) {
  /* will fix Image-header later to be an actual logo + header */
  return (
    <>
      <div className="background">
        <Grid centered columns={1}>
          <Grid.Row style={{ marginTop: '100px' }}>
            <Grid.Column>
              <Header as="h1" textAlign="center">
                <Image src="https://www.freeiconspng.com/uploads/letter-d-icon-png-28.png" centered />
                aikon Calendar
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: '20px' }}>
            <Grid.Column width={3}>
              {
                loginErrorMsg ? (
                    <Message negative>
                      {loginErrorMsg}
                    </Message>
                ) : null
              }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Form size="medium" key="small">
              <Form.Field width={20}>
                <Label style={{ marginBottom: '8px' }}>Email</Label>
                <input
                  onChange={handleEmailChange}
                  value={email}
                  placeholder="example@hotmail.com"
                  className="loginInputStyle"
                  style={{ marginBottom: '10px' }}
                />
              </Form.Field>
              <Form.Field width={20}>
                <Label style={{ marginBottom: '8px' }}>Password</Label>
                <input
                  onChange={handlePassChange}
                  type="password"
                  value={password}
                  placeholder="*********"
                />
              </Form.Field>
              <Button onClick={handleLogin}>Log In</Button>
              <Button as={NavLink} exact to="/Signup"> Sign up</Button>
            </Form>
          </Grid.Row>
        </Grid>
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
