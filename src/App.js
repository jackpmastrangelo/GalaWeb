import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Other from './pages/Other';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/other" component={Other}/>
      </Switch>
    );
  }
}

export default App;
