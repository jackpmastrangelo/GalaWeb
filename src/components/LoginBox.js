import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from "../state/loginState";
import { Session } from "../state/Session";

//This component is a standard login component for Gala.
class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailField: "",
      passwordField: "",
      errorMessage: ""
    }
  }

  handleLogin = (email, password) => {
    if (email && password) {
      this.setState({errorMessage: ""});
      this.props.dispatch(login(email, password));
    } else {
      this.setState({errorMessage: "Please fill out both email and password fields!"});
    }
  };

  handleFieldChange = (event, field) => {
    let change = {};
    change[field] = event.target.value;
    this.setState(change);
  };

  //TODO Might be able to create an abstract form component that does the error handling with state
  // these two methods are the exact same in LoginBox and SignUpBox
  renderErrorMessage() {
    if (this.state.errorMessage) {
      return (
        <h4>{this.state.errorMessage}</h4>
      );
    }
  }

  componentDidUpdate() {
    const propsErrorMessage = this.props.errorMessage;
    const currErrorMessage = this.state.errorMessage;
    if (propsErrorMessage && currErrorMessage !== propsErrorMessage) {
      this.setState({errorMessage: propsErrorMessage});
    }
  }

  render() {
    const email = this.state.emailField,
          password = this.state.passwordField;

    return (
      Session.sessionExists() ?
      <Redirect to={this.props.destination} />
      : (
        <div className="login-box">
          <h2>Welcome to Gala!</h2>
          <h3>Please enter your login information below:</h3>
          <input value={email}
                 placeholder={"Email"}
                 onChange={(event) => this.handleFieldChange(event, "emailField")} />
          <input value={password}
                 type={"password"}
                 placeholder={"Password"}
                 onChange={(event) => this.handleFieldChange(event, "passwordField")} />
          <div className={"button"} onClick={() => { this.handleLogin(email, password)}} >
            <button>Go!</button>
          </div>
          {this.renderErrorMessage()}
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