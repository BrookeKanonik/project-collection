import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Users from './user/pages/User'
function App() {
  return <Router>
    <Route path="/" exact>
      <Users />
    </Route>
  </Router>
}

export default App;
