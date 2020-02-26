import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import '../style.css';

function NavBar() {
  return (
    <div className="ui borderless topmenu menu">
      <Header as="h3" className="content">
        <Icon name="calendar" size="large" />
        Daikon Calendar
      </Header>
    </div>
  );
}


export default NavBar;
