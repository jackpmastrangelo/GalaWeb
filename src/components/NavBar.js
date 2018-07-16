import React from 'react';
import Session from "../state/Session";
import { NavLink } from 'react-router-dom';
import '../styles/components/NavBar.scss';
import { globalStateReset } from "../state/galaStore";
import { connect } from 'react-redux';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: Session.sessionExists()
    }
  }

  logout() {
    this.props.dispatch(globalStateReset());
  }

  render() {
    let accountComponents = undefined;

    if (this.state.loggedIn) {
      accountComponents = [
        <div className="navbar-elt" key={1}>
          <NavLink to="/dashboard" className="navbar-elt-link" >
            My Dashboard
          </NavLink>
        </div>,
        <div className="navbar-elt" onClick={() => { this.logout()}} key={2}>
          <NavLink to="/" className="navbar-elt-link" >
            Logout
          </NavLink>
        </div>
      ]
    } else {
      accountComponents = [
        <div className="navbar-elt" key={1}>
          <NavLink to="/signup"  className="navbar-elt-link">
            Make an account
          </NavLink>
        </div>
      ]
    }

    return(
      <div className="navbar">
        {accountComponents}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(NavBar);