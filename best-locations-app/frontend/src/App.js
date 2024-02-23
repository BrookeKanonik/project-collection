import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';

function App() {
  return (
  <Router>
    <MainNavigation />
    <main>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
      {/* redirect, if a user enters in a url other than the above options */}
        <Redirect to="/" /> 
      </Switch>
    </main>
  </Router>
  );
}

export default App;
