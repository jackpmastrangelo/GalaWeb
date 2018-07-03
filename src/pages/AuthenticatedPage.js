import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingSpinner from "../components/LoadingSpinner";
import Session from '../state/Session';

class AuthenticatedPage extends React.Component {
  render() {
    const subComponent = this.props.subComponent,
          loggedIn = Session.sessionExists(),
          attemptingLogin = this.props.attemptingLogin;

    let renderComponent = undefined;
    if (loggedIn) {
      renderComponent = subComponent;
    } else if (attemptingLogin) {
      renderComponent = (
        <div>
          <h3>
            Hold on, we're logging you in right now!
          </h3>
          <LoadingSpinner />
        </div>
      )
    } else {
      renderComponent = <Redirect to="/"/>
    }

    return(
      renderComponent
    );
  }
}

function mapStateToProps(state) {
  return {
    attemptingLogin: state.loginState.fetching
  }
}

export default connect(mapStateToProps)(AuthenticatedPage);