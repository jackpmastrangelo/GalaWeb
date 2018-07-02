import React from 'react'
import LoadingSpinner from "./LoadingSpinner";
import { connect } from 'react-redux';
import { createAccount } from "../state/createAccountState";

class SignUpBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameField: "",
      lastNameField: "",
      emailField: "",
      passwordField: ""
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

    return (
      <div className={"signup-box"}>
        <h2>Welcome to Gala!</h2>
        <h3>Please enter your login information below:</h3>
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
          <p>Go!</p>
        </div>
        { loading }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.createAccountState.fetching
  }
}

export default connect(mapStateToProps)(SignUpBox)