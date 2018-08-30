import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from "../state/apiState/loginState";
import { Session } from "../state/Session";

//This component is a standard login component for Gala.
class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameField: "Username",
      passwordField: "Password"
    }
  }

  handleLogin(email, password) {
    this.props.dispatch(login(email, password));
  }

  handleFieldChange(event, field) {
    let change = {};
    change[field] = event.target.value;
    this.setState(change);
  }

  render() {
    const userNameField = this.state.userNameField,
          passwordField = this.state.passwordField,
          success = Session.sessionExists(),
          errorRender = this.props.error
            ? (<h4>
                {this.props.errorMessage}
              </h4>)
            : undefined;

    return(
      success ?
      <Redirect to={this.props.destination} />
      : (
        <div className="login-box">
          <h2>Welcome to Gala!</h2>
          <h3>Please enter your login information below:</h3>
          <input value={userNameField}
                 onChange={(event) => this.handleFieldChange.bind(this)(event, "userNameField")} />
          <input value={passwordField}
                 onChange={(event) => this.handleFieldChange.bind(this)(event, "passwordField")} />
          <div className={"button"} onClick={() => { this.handleLogin.bind(this)(userNameField, passwordField)}} >
            <button>Go!</button>
          </div>
          {errorRender}
        </div>
      )
    )
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.loginState.fetching,
    error: state.loginState.error,
    errorMessage: state.loginState.errorMessage
  }
}

export default connect(mapStateToProps)(LoginBox);