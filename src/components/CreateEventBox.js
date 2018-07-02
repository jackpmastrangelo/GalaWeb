import React from 'react'
import LoadingSpinner from "./LoadingSpinner";
import { connect } from 'react-redux';
import {createEvent} from "../state/createEventsState";

class CreateEventBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventNameField: "",
      eventPlaceField: "",
      eventTimeField: "",
      capacityField: ""
    }
  }

  handleFieldChange(event, field) {
    let change = {};
    change[field] = event.target.value;
    this.setState(change);
  }

  createEvent(firstName, lastName, email, password) {
    this.props.dispatch(createEvent(firstName, lastName, email, password));
  }

  render() {
    const eventNameField = this.state.eventNameField,
      eventPlaceField = this.state.eventPlaceField,
      eventTimeField = this.state.eventTimeField,
      capacityField = this.state.capacityField;

    const loading = this.props.fetching ? <LoadingSpinner/> : <div />;

    return (
      <div className={"signup-box"}>
        <h2>Creating an event!</h2>
        <h3>Please enter event information below:</h3>
        <input value={eventNameField}
               onChange={(event) => this.handleFieldChange.bind(this)(event, "eventNameField")}/>
        <input value={eventPlaceField}
               onChange={(event) => this.handleFieldChange.bind(this)(event, "eventPlaceField")}/>
        <input value={eventTimeField}
               onChange={(event) => this.handleFieldChange.bind(this)(event, "eventTimeField")}/>
        <input value={capacityField}
               onChange={(event) => this.handleFieldChange.bind(this)(event, "capacityField")}/>
        <div className={"button"}
             onClick={() => {this.createEvent.bind(this)(eventNameField, eventPlaceField, eventTimeField, capacityField)}}>
          <p>Go!</p>
        </div>
        { loading }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.createEventState.fetching
  }
}

export default connect(mapStateToProps)(CreateEventBox)