import React from 'react';
import NavBar from '../components/NavBar';
import LoginBox from '../components/LoginBox';

export default class ReAuth extends React.Component {
  render() {
    let destination = undefined;

    if (this.props.location && this.props.location.destination) {
      destination = this.props.location.destination;
    } else {
      destination = "/";
    }

    return (
      <div className={"reauth"}>
        <NavBar />
        <div>
          <h3>Uh oh! It looks like you've been logged out. Login below to continue where you left off.</h3>
        </div>
        <LoginBox destination={destination} />
      </div>
    );
  }
}