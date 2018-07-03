import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from "./pages/Landing";
import EventDash from "./pages/EventDash";
import EventCreate from "./pages/EventCreate";
import AuthenticatedPage from "./pages/AuthenticatedPage";
import SignUp from "./pages/SignUp";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/events/create"
               render={(props) => <AuthenticatedPage {...props} subComponent={<EventCreate />} />}/>
        <Route path="/dashboard"
               render={(props) => <AuthenticatedPage {...props} subComponent={<EventDash />} />}/>
      </Switch>
    );
  }
}

export default App;
