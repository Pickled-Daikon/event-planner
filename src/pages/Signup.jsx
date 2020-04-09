import React from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Segment,
  Grid,
  Header,
  Message, MessageHeader, MessageList, MessageItem,
} from 'semantic-ui-react';

import '../css/style.css';

function Signup({
  createUserErr,
  handleSignup,
  firstName,
  firstNameChange,
  lastName,
  lastNameChange,
  email,
  emailChange,
  password,
  passwordChange,
}) {
  return (
    <>
      <div className="background">
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Register your account
              </Header>
              {createUserErr ? <Message error>{createUserErr}</Message> : null}
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
      </div>
    </>
  );
}

Signup.propTypes = {
  handleSignup: PropTypes.func.isRequired,
  errorMsg: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  firstNameChange: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  lastNameChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  emailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passwordChange: PropTypes.func.isRequired,
};

export default Signup;
