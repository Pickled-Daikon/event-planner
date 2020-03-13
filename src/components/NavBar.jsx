import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {storeJwtToken} from "../api/users";
import { Header, Icon, Button } from 'semantic-ui-react';
import '../style.css';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    storeJwtToken(null);
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Redirect to={'../'} />
  }

  return (
    <div className="ui borderless topmenu menu">
      <Header as="h3" className="content">
        <Icon name="calendar" size="large" />
        Daikon Calendar
      </Header>
      <Button floated={'right'} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}


export default NavBar;
