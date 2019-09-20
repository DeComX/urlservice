import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ABCRedirect from './Redirect';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/:id" component={ABCRedirect} />
      </Router>
    );
  }
}

export default App;
