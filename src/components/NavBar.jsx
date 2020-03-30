import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Header, Menu, Icon,
} from 'semantic-ui-react';
import { setJwtToken } from '../api/jwt';
import '../css/style.css';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setJwtToken(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Redirect to="../" />;
  }


  return (
    <>
      <Menu className="navBarStyle" borderless color="black">
        <Menu.Item>
          <Icon name="calendar" size="big" />
        </Menu.Item>
        <Menu.Item className="contentNavBar">
          <Header as="h3">
            Daikon Calendar
          </Header>
        </Menu.Item>
        <Menu.Menu position="right" className="logoutButton">
          <Menu.Item onClick={handleLogout}>
              <Header as="h3">Logout</Header>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
}


export default NavBar;
