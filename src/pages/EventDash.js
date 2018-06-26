import React from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorBox from "../components/ErrorBox";
import NothingHere from "../components/NothingHere";
import EventList from "../components/EventList";
import { fetchEvents } from "../state/eventState";

//Dashboard that shows a user's events and lets them select one.
class EventDash extends React.Component {
  constructor(props) {
    super(props);

  }

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
    fetching: state.eventState.fetching,
    events: state.eventState.events,
    error: state.eventState.error,
    errorMessage: state.eventState.errorMessage
  }
}

export default connect(mapStateToProps)(EventDash)