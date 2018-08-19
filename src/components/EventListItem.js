import React from 'react';
import { Link } from 'react-router-dom';
import { MdSubdirectoryArrowRight } from 'react-icons/lib/md';
import "../styles/components/EventListItem.scss";
import Moment from 'moment';

export default class EventListItem extends React.Component {
  render() {
    const event = this.props.event;

    const startTime = new Moment(event.startTime);

    return(
      <div className="eli-container">
        <div className="event-list-item">
          <div className="eli-row">
            <p className="eli-text">
              {event.name}
            </p>
            <p className="eli-text">
              {startTime.format("lll")}
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