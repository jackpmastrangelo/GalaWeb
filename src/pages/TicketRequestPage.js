import React from 'react';
import NavPage from "../components/NavPage";
import { connect } from 'react-redux';
import { fetchEventDetails } from "../state/fetchEventDetailsState";
import LoadingSpinner from "../components/LoadingSpinner";
import TicketRequest from "../components/TicketRequest";

class TicketRequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.match.params.eventId
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchEventDetails(this.state.eventId));
  }

  render() {
    let renderComponent = undefined;

    if(this.props.fetchingEventDetails) {
      renderComponent = <LoadingSpinner />
    } else if (this.props.fetchedEvent) {
      renderComponent = <TicketRequest event={this.props.fetchedEvent}/>
    }

    return(
      <NavPage>
        {renderComponent}
      </NavPage>
    )
  }
}

function mapStateToProps(state) {
  return {
    fetchingEventDetails: state.fetchEventDetailsState.fetching,
    fetchedEvent: state.fetchEventDetailsState.event,
    eventDetailsError: state.fetchEventDetailsState.error,
    eventDetailsErrorMessage: state.fetchEventDetailsState.errorMessage
  }
}

export default connect(mapStateToProps)(TicketRequestPage);