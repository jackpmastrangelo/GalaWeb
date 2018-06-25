import React from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from "../state/eventState";

class Home extends React.Component {

  componentDidMount() {
  }

  sendIT() {
    this.props.dispatch(fetchEvents(1));
  }

  sendIT = this.sendIT.bind(this);

  render() {
    const loadingJsx = this.props.eventState.fetching ? <h2>Fetching</h2> : <h2>Not Fetching</h2>
    const numEvents = this.props.eventState.events.length;

    return (
      <div>
        <h1>Welcome to index</h1>
        { loadingJsx }
        <div style={{backgroundColor: "#A7A7A7"}} onClick={this.sendIT}>
          <h3>Send it</h3>
        </div>
        <div>
          <h3>{numEvents}</h3>
          <h3>{ JSON.stringify(this.props.eventState.events) }</h3>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    eventState: state.eventState
  }
}

export default connect(mapStateToProps)(Home)