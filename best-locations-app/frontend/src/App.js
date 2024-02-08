import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace';

function App() {
  return (
  <Router>
    <Switch></Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/places/new" exact>
        <NewPlace />
      </Route>
    {/* redirect, if a user enters in a url other than the above options */}
    <Redirect to="/" /> 
  </Router>
  );
}

export default App;
