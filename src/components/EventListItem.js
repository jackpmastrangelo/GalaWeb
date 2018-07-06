import React from 'react';
import { Link } from 'react-router-dom';
import { MdSubdirectoryArrowRight } from 'react-icons/lib/md';
import "../styles/components/EventListItem.scss";

export default class EventListItem extends React.Component {
  render() {
    const event = this.props.event;

    return(
      <div className="eli-container">
        <div className="event-list-item">
          <div className="eli-row">
            <p className="eli-text">
              {event.name}
            </p>
            <p className="eli-text">
              {event.eventTime}
            </p>
          </div>
          <div className="eli-row">
            <p className="eli-text">
              {event.place}
            </p>
            <Link to={"/request-ticket/" + event.id} className="eli-link">
              Request ticket link <MdSubdirectoryArrowRight />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}