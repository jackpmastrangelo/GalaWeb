import React from 'react';

export default class EventListItem extends React.Component {

  //TODO Content
  render() {
    const event = this.props.event;

    return(
      <div className={"event-list-item"}>
        <h5>Event Name</h5>
        <h6>{event.name}</h6>
        <h5>Event Place</h5>
        <h6>{event.place}</h6>
        <h5>Event Capacity</h5>
        <h6>{event.capacity}</h6>
      </div>
    )
  }
}