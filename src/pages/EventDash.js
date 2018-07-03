import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorBox from "../components/ErrorBox";
import EventList from "../components/EventList";
import { fetchEvents } from "../state/fetchEventsState";
import EventCreate from "./EventCreate";
import NavBar from "../components/NavBar";

//Dashboard that shows a user's events and lets them select one.
class EventDash extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchEvents(1));
  }

  render() {
    let subComponent = undefined;

    if (this.props.fetching) {
      subComponent = (
        <LoadingSpinner />
      )
    } else if (this.props.error) {
      subComponent = (
        <ErrorBox message={this.props.errorMessage}/>
      )
    } else if (this.props.events.length < 1) {
      subComponent = (
        <div>
          <h2>
            Nothing here!
          </h2>
          <Link to="/events/create">
            Get started by creating an event.
          </Link>
        </div>
      )
    } else if (this.props.events.length >= 1) {
      subComponent = (
        <EventList events={this.props.events}/>
      )
    } else {
      subComponent = (
        <ErrorBox message={"Something went wrong fetching your events."}/>
      )
    }

    return (
      <div>
        <NavBar />
        {subComponent}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.fetchEventsState.fetching,
    events: state.fetchEventsState.events,
    error: state.fetchEventsState.error,
    errorMessage: state.fetchEventsState.errorMessage
  }
}

export default connect(mapStateToProps)(EventDash)