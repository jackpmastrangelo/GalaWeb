import React from 'react';
import EventListItem from './EventListItem';
import CreateEvent from './CreateEvent';
import "../styles/components/EventList.scss"

export default class EventList extends React.Component {

  //TODO Styling
  render() {
    let events = this.props.events;
    let eventComponents = [];

    events.forEach(function (event, index) {
      let component = <EventListItem key={index} event={event}/>;
      eventComponents.push(component);
    });

    return (
      <div className="event-list">
        {eventComponents}
        <CreateEvent location={this.props.location}/>
      </div>
    )
  }
}