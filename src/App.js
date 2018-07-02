import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from "./pages/Landing";
import EventDash from "./pages/EventDash";
import EventCreate from "./pages/EventCreate";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/events/create" component={EventCreate}/>
        <Route path="/events" component={EventDash}/>
      </Switch>
    );
  }
}

export default App;
