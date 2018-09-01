import React from 'react'
import LoadingSpinner from "./LoadingSpinner";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createAccount } from "../state/createAccountState";

class SignUpBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameField: "",
      lastNameField: "",
      emailField: "",
      passwordField: "",
      errorMessage: ""
    }
  }

  handleFieldChange = (event, field) => {
    let change = {};
    change[field] = event.target.value;
    this.setState(change);
  };

  //TODO might even be able to abstract out field validation or that might be a bit restricting
  createAccount(firstName, lastName, email, password) {
    if (firstName && lastName && email && password) {
      this.setState({errorMessage: ""});
      this.props.dispatch(createAccount(firstName, lastName, email, password));
    } else {
      this.setState({errorMessage: "Please fill out all fields!"})
    }
  }

  //TODO Might be able to create an abstract form component that does the error handling with state
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
    if (propsErrorMessage && !currErrorMessage) {
      this.setState({errorMessage: propsErrorMessage});
    }
  }

  render() {
    const firstName = this.state.firstNameField,
          lastName = this.state.lastNameField,
          email = this.state.emailField,
          password = this.state.passwordField;

    if (this.props.signUpSuccessful) {
      return (
        <Redirect to="/dashboard"/>
      );
    }

    return (
      <div className={"signup-box"}>
        <h2>Welcome to Gala!</h2>
        <h3>Please enter your new account information below:</h3>
        <input value={firstName}
               placeholder={"First name"}
               onChange={(event) => this.handleFieldChange(event, "firstNameField")}/>
        <input value={lastName}
               placeholder={"Last name"}
               onChange={(event) => this.handleFieldChange(event, "lastNameField")}/>
        <input value={email}
               placeholder={"Email"}
               onChange={(event) => this.handleFieldChange(event, "emailField")}/>
        <input value={password}
               type={"password"}
               placeholder={"Password"}
               onChange={(event) => this.handleFieldChange(event, "passwordField")}/>
        <div className={"button"}
              onClick={() => {this.createAccount(firstName, lastName, email, password)}}>
          <button>Go!</button>
        </div>
        { this.props.fetching ? <LoadingSpinner/> : undefined }
        {this.renderErrorMessage()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.createAccountState.fetching,
    signUpSuccessful: state.createAccountState.success,
    errorMessage: state.createAccountState.message
  }
}

export default connect(mapStateToProps)(SignUpBox)