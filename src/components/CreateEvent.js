import React from 'react';
import {connect} from "react-redux";
import '../styles/components/CreateEvent.scss'
import {createEvent, beginEditingEvent} from "../state/createEventsState";

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventNameField: "",
      eventDateField: "",
      placeField: "",
      descriptionField: "",
      capacityField: ""
    }
  }

  toggleEditing() {
    this.props.dispatch(beginEditingEvent())
  }

  createEvent() {
    this.props.dispatch(createEvent(this.state.eventNameField,
      this.state.placeField,
      this.state.eventDateField,
      this.state.capacityField));
  }

  handleFieldChange(event, field) {
    let change = {};
    change[field] = event.target.value;
    this.setState(change);
  }

  render() {
    const editingClass = this.props.editing ? " editing" : "";

    return(
      <div className={"create-event" + editingClass}>
        <div className="create-event-button" onClick={() => { this.toggleEditing.bind(this)() }}>
          <p>
            Create Event
          </p>
        </div>
        <div className="create-event-box">
          <div className="ce-row">
            <div className="ce-input-container short">
              <p className="ce-subtext">
                Name
              </p>
              <input value={this.state.eventNameField}
                     onChange={(event) => this.handleFieldChange.bind(this)(event, "eventNameField")}/>
            </div>
            <div className="ce-input-container short">
              <p className="ce-subtext">
                Date (MM-DD-YYYY)
              </p>
              <input value={this.state.eventDateField}
                     onChange={(event) => this.handleFieldChange.bind(this)(event, "eventDateField")}/>
            </div>
          </div>
          <div className="ce-row">
            <div className="ce-input-container long">
              <p className="ce-subtext">
                Place
              </p>
              <input value={this.state.placeField}
                     onChange={(event) => this.handleFieldChange.bind(this)(event, "placeField")}/>
            </div>
          </div>
          <div className="ce-row">
            <div className="ce-input-container long">
              <p className="ce-subtext">
                Description
              </p>
              <textarea value={this.state.descriptionField}
                        onChange={(event) => this.handleFieldChange.bind(this)(event, "descriptionField")}/>
            </div>
          </div>
          <div className="ce-row">
            <div className="ce-input-container stub">
              <p className="ce-subtext">
                Capacity
              </p>
              <input value={this.state.capacityField}
                     onChange={(event) => this.handleFieldChange.bind(this)(event, "capacityField")}/>
            </div>
            <div className="ce-submit"
                 onClick={() => { this.createEvent.bind(this)() }}>
              Create Event
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.createEventState.fetching,
    editing: state.createEventState.editing
  }
}

export default connect(mapStateToProps)(CreateEvent)