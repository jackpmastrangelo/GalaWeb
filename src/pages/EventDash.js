import React from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorBox from "../components/ErrorBox";
import NothingHere from "../components/NothingHere";
import EventList from "../components/EventList";
import { fetchEvents } from "../state/fetchEventsState";

//Dashboard that shows a user's events and lets them select one.
class EventDash extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchEvents(1));
  }

  render() {
    if (this.props.fetching) {
      return(
        <LoadingSpinner />
      )
    } else if (this.props.error) {
      return (
        <ErrorBox message={this.props.errorMessage}/>
      )
    } else if (this.props.events.length < 1) {
      return (
        <NothingHere message={"Get started and create an event!"}/>
      )
    } else if (this.props.events.length >= 1) {
      return (
        <EventList events={this.props.events}/>
      )
    } else {
      return (
        <ErrorBox message={"Something went wrong fetching your events."}/>
      )
    }
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