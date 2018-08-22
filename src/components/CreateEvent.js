import React from 'react';
import {connect} from "react-redux";
import '../styles/components/CreateEvent.scss'
import {createEvent, beginEditingEvent} from "../state/createEventsState";
import { Redirect } from 'react-router';
import { SingleDatePicker } from 'react-dates';
import TimePicker from 'rc-time-picker';
import Moment from 'moment';

const NUM_DATE_PICKER_MONTHS = 1;

class CreateEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      eventNameField: "",
      placeField: "",
      descriptionField: "",
      capacityField: "",
      startDate: null,
      startTime: new Moment(),
      startDateFocused: false,
      endDate: null,
      endTime: new Moment(),
      endDateFocused: false
    }
  }

  toggleEditing = () => {
    this.props.dispatch(beginEditingEvent())
  };

  createEvent = () => {
    let startDateTime = this.state.startDate,
        endDateTime = this.state.endDate;

    startDateTime.hours(this.state.startTime.hours());
    startDateTime.minutes(this.state.startTime.minutes());
    startDateTime.seconds(this.state.startTime.seconds());

    endDateTime.hours(this.state.endTime.hours());
    endDateTime.minutes(this.state.endTime.minutes());
    endDateTime.seconds(this.state.endTime.seconds());

    this.props.dispatch(createEvent(this.state.eventNameField,
      this.state.placeField,
      startDateTime.toISOString(true),
      startDateTime.toISOString(true),
      this.state.capacityField,
      this.state.descriptionField));
  };

  handleFieldChange = (event, field) => {
    let change = {};
    change[field] = event.target.value;
    this.setState(change);
  };

  render() {
    const editingClass = this.props.editing ? " editing" : "";

    if (this.props.credentialsExpired) {
      return <Redirect to={{ pathname: "/reauth", destination: this.props.location.pathname}}/>
    }

    return(
      <div className={"create-event" + editingClass}>
        <div className="create-event-button" onClick={this.toggleEditing}>
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
                     onChange={event => this.handleFieldChange(event, "eventNameField")}/>
            </div>
          </div>
          <div className="ce-row">
            <div className="ce-input-container short datepicker">
              <p className="ce-subtext">
                Start Date:
              </p>
              <SingleDatePicker date={this.state.startDate}
                                onDateChange={date => { this.setState({ startDate: date }) }}
                                focused={this.state.startDateFocused}
                                onFocusChange={({ focused }) => { this.setState({ startDateFocused: focused }) }}
                                id={"start-date-picker"}
                                numberOfMonths={NUM_DATE_PICKER_MONTHS}
                                small={true}
              />
            </div>
            <div className="ce-input-container short datepicker">
              <p className="ce-subtext">
                Start Time:
              </p>
              <TimePicker use12Hours={true}
                          showSecond={false}
                          value={this.state.startTime}
                          onChange={moment => { this.setState({ startTime: moment }) }}
                          />
            </div>
            <div className="ce-input-container short datepicker">
              <p className="ce-subtext">
                End Date:
              </p>
              <SingleDatePicker date={this.state.endDate}
                                onDateChange={date => { this.setState({ endDate: date }) }}
                                focused={this.state.endDateFocused}
                                onFocusChange={({ focused }) => { this.setState({ endDateFocused: focused }) }}
                                id={"start-date-picker"}
                                numberOfMonths={NUM_DATE_PICKER_MONTHS}
                                small={true}
              />
            </div>
            <div className="ce-input-container short datepicker">
              <p className="ce-subtext">
                End Time:
              </p>
              <TimePicker use12Hours={true}
                          showSecond={false}
                          value={this.state.endTime}
                          onChange={moment => { this.setState({ endTime: moment }) }}
                          />
            </div>
          </div>
          <div className="ce-row">
            <div className="ce-input-container long">
              <p className="ce-subtext">
                Place
              </p>
              <input value={this.state.placeField}
                     onChange={event => this.handleFieldChange(event, "placeField")}/>
            </div>
          </div>
          <div className="ce-row">
            <div className="ce-input-container long">
              <p className="ce-subtext">
                Description
              </p>
              <textarea value={this.state.descriptionField}
                        onChange={event => this.handleFieldChange(event, "descriptionField")}/>
            </div>
          </div>
          <div className="ce-row">
            <div className="ce-input-container stub">
              <p className="ce-subtext">
                Capacity
              </p>
              <input value={this.state.capacityField}
                     onChange={event => this.handleFieldChange(event, "capacityField")}/>
            </div>
            <div className="ce-submit" onClick={this.createEvent}>
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
    editing: state.createEventState.editing,
    credentialsExpired: state.sessionState.credentialsExpired
  }
}

export default connect(mapStateToProps)(CreateEvent)