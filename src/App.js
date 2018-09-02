import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from "./pages/Landing";
import EventDash from "./pages/Dashboard";
import AuthenticatedPage from "./pages/AuthenticatedPage";
import SignUp from "./pages/SignUp";
import TicketRequestPage from "./pages/TicketRequestPage";
import ReAuth from "./pages/ReAuth";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'rc-time-picker/assets/index.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard"
               render={(props) => <AuthenticatedPage {...props} subComponent={<EventDash />} />} />
        <Route path="/reauth" component={ReAuth} />
        <Route path="/request-ticket/:eventId" component={TicketRequestPage} />
      </Switch>
    );
  }
}

export default App;
