import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import MainCalendarPage from './pages/MainCalendarPage';
import Login from './pages/login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={MainCalendarPage} />
        <Route path="/Signup" component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
