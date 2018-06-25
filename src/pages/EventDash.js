import React from 'react';
import connect from 'react-redux';
import LoadingSpinner from "../components/LoadingSpinner";

//Dashboard that shows a user's events and lets them select one.
class EventDash extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (this.props.fetching) {
      return(
        <LoadingSpinner />
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