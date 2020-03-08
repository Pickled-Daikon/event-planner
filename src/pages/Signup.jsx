import React, { useState } from 'react';
import {
  Form, Button, Label, Message, Container, Segment, Grid, Header,
} from 'semantic-ui-react';
import '../style.css';

function Signup() {
  return (
    <>
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form>
              <Segment stacked>
                <Form.Input
                  label="First name"
                  icon="user"
                  iconPosition="left"
                  name="firstName"
                  type="firstName"
                  placeholder="Enter Your First Name"
                />
                <Form.Input
                  label="Last Name"
                  icon="user"
                  iconPosition="left"
                  name="lastName"
                  placeholder="Enter Your Last Name"
                  type="lastName"
                />
                <Form.Input
                  label="Email"
                  icon="mail"
                  iconPosition="left"
                  name="email"
                  placeholder="example@hotmail.com"
                  type="email"
                />
                <Form.Input
                  label="Username"
                  icon="user"
                  iconPosition="left"
                  name="username"
                  placeholder="Enter Your Username"
                  type="username"
                />
                <Form.Input
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
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
