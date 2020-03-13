import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import MainCalendarPage from './pages/MainCalendarPage';
import NavBar from './components/NavBar';
import Login from './pages/login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={MainCalendarPage} />
        <Route path="/Signup" component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
