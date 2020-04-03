import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainCalendar from './pages/MainCalendarWrapper';
import Login from './pages/LoginWrapper';
import Signup from './pages/SignupWrapper';
import loginWithJwt from './api/users/loginWithJwt';

import store from './store';

// attempt to login w/ local storage

loginWithJwt();
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={MainCalendar} />
          <Route path="/Signup" component={Signup} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
