import React from 'react';
import { connect } from 'react-redux';
import { requestTicket } from "../state/requestTicketState";
import '../styles/components/TicketRequest.scss'

class TicketRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailField: ""
    }
  }

  requestTicket = () => {
    this.props.dispatch(requestTicket(this.props.event.id, this.state.emailField));
  };

  handleFieldChange(event, field) {
    let change = {};
    change[field] = event.target.value;
    this.setState(change);
  }

  render() {
    const event = this.props.event;
    let informationText = undefined;

    if (this.props.success) {
      informationText = "Success! A ticket was sent to your emailField.";
    } else if (this.props.error) {
      informationText = this.props.errorMessage;
    }

    return (
      <div className="tr-container">
        <div className="ticket-request">
          <h1>
            Request a ticket for {event.name}
          </h1>
          <h5>{event.description}</h5>
          <h4>Starts:<br/>{event.startTime}</h4>
          <h4>Ends:<br/>{event.endTime}</h4>
          <h4>Where:<br/>{event.place}</h4>
          <h2>Enter your email to get your ticket:</h2>
          <div className="tr-form">
            <div className="tr-form-input-container">
              <p className="tr-form-subtext">Email:</p>
              <input value={this.state.emailField}
                     onChange={(event) => this.handleFieldChange(event, "emailField")} />
            </div>
            <div className="tr-form-submit" onClick={this.requestTicket}>
              <p>Give me a ticket!</p>
            </div>
          </div>
          <div className="tr-information">
            {informationText}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.requestTicketState.fetching,
    success: state.requestTicketState.success,
    ticket: state.requestTicketState.ticket,
    error: state.requestTicketState.error,
    errorMessage: state.requestTicketState.errorMessage
  }
}

export default connect(mapStateToProps)(TicketRequest)