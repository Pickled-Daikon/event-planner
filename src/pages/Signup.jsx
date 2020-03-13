import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import {createUser, storeJwtToken} from "../api/users";
import {
  Form,
  Container,
  Segment,
  Grid,
  Header,
} from 'semantic-ui-react';
import '../style.css';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignup = () => {
    createUser({
      firstName,
      lastName,
      email,
      password,
      isAdmin: false,
    }).then((token) => {
      storeJwtToken(token);
      setIsLoggedIn(true);
    });
  };

  const firstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const lastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  if (isLoggedIn) {
    return <Redirect to="../" />;
  }
  return (
    <>
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            {/* <Form onSubmit={handleSignup} as={NavLink} exact to="/"> */}
            {' '}
            {/* Uncomment to have signup redirect to login page */}
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
