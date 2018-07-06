import React from 'react';
import Session from "../state/Session";
import { NavLink } from 'react-router-dom';
import '../styles/components/NavBar.scss';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: Session.sessionExists()
    }
  }

  render() {
    let accountComponent = undefined;

    if (this.state.loggedIn) {
      accountComponent = (
        <div className="navbar-elt">
          <NavLink to="/dashboard" className="navbar-elt-link" >
            My Dashboard
          </NavLink>
        </div>
      );
    } else {
      accountComponent = (
        <div className="navbar-elt">
          <NavLink to="/signup"  className="navbar-elt-link">
            Make an account
          </NavLink>
        </div>
      );
    }

    return(
      <div className="navbar">
        {accountComponent}
      </div>
    )
  }
}