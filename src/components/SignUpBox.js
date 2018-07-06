import React from 'react'
import LoadingSpinner from "./LoadingSpinner";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createAccount } from "../state/createAccountState";

class SignUpBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameField: "first",
      lastNameField: "last",
      emailField: "email",
      passwordField: "password"
    }
  }

  handleFieldChange(event, field) {
    let change = {};
    change[field] = event.target.value;
    this.setState(change);
  }

  createAccount(firstName, lastName, email, password) {
    this.props.dispatch(createAccount(firstName, lastName, email, password));
  }

  render() {
    const firstNameField = this.state.firstNameField,
          lastNameField = this.state.lastNameField,
          emailField = this.state.emailField,
          passwordField = this.state.passwordField;

    const loading = this.props.fetching ? <LoadingSpinner/> : <div />

    if (this.props.signUpSuccessful) {
      return (
        <Redirect to="/dashboard"/>
      );
    }

    return (
      <div className={"signup-box"}>
        <h2>Welcome to Gala!</h2>
        <h3>Please enter your new account information below:</h3>
        <input value={firstNameField}
               onChange={(event) => this.handleFieldChange.bind(this)(event, "firstNameField")}/>
        <input value={lastNameField}
               onChange={(event) => this.handleFieldChange.bind(this)(event, "lastNameField")}/>
        <input value={emailField}
               onChange={(event) => this.handleFieldChange.bind(this)(event, "emailField")}/>
        <input value={passwordField}
               onChange={(event) => this.handleFieldChange.bind(this)(event, "passwordField")}/>
        <div className={"button"}
              onClick={() => {this.createAccount.bind(this)(firstNameField, lastNameField, emailField, passwordField)}}>
          <button>Go!</button>
        </div>
        { loading }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.createAccountState.fetching,
    signUpSuccessful: state.createAccountState.success
  }
}

export default connect(mapStateToProps)(SignUpBox)
