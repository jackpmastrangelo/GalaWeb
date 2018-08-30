import React from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from "../state/apiState/fetchEventsState";
import NavPage from "../components/NavPage";
import EventList from "../components/EventList";
import LoadingSpinner from "../components/LoadingSpinner";
import { Redirect } from 'react-router';

//Dashboard that shows a user's events and lets them select one.
class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchEvents());
  }

  render() {
    let renderComponent = undefined;

    if (this.props.fetching) {
      renderComponent = <LoadingSpinner/>
    } else if (this.props.credentialsExpired) {
      renderComponent = <Redirect to={{ pathname: "/reauth", destination: "/dashboard" }}/>
    } else if (this.props.error) {
      renderComponent = <div>{this.props.errorMessage}</div>
    } else {
      renderComponent = <EventList events={this.props.events} location={"/dashboard"}/>
    }

    return (
      <NavPage>
        {renderComponent}
      </NavPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.fetchEventsState.fetching,
    events: state.fetchEventsState.events,
    error: state.fetchEventsState.error,
    errorMessage: state.fetchEventsState.errorMessage,
    credentialsExpired: state.sessionState.credentialsExpired
  }
}

export default connect(mapStateToProps)(Dashboard)