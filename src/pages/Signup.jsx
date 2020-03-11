import React, { useState } from 'react';
import {
  Form, Container, Segment, Grid, Header,
} from 'semantic-ui-react';
import '../style.css';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSignup(e) {
    console.log(firstName, lastName, email, username, password);
  }

  const firstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const usernameChange = (e) => {
    setUsername(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };


  return (
    <>
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
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
                  label="Username"
                  icon="user"
                  iconPosition="left"
                  value={username}
                  placeholder="Enter Your Username"
                  type="username"
                  onChange={usernameChange}
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
                <Form.Button content="Submit" />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
}

export default Signup;
