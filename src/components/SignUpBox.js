import React from 'react'
import LoadingSpinner from "./LoadingSpinner";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createAccount } from "../state/createAccountState";

class SignUpBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  }

  handleFieldChange = (event, field) => {
    let change = {};
    change[field] = event.target.value;
    this.setState(change);
  };

  createAccount(firstName, lastName, email, password) {
    this.props.dispatch(createAccount(firstName, lastName, email, password));
  }

  render() {
    const firstName = this.state.firstName,
          lastName = this.state.lastName,
          email = this.state.email,
          password = this.state.password;

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
               onChange={(event) => this.handleFieldChange(event, "firstName")}/>
        <input value={lastName}
               placeholder={"Last name"}
               onChange={(event) => this.handleFieldChange(event, "lastName")}/>
        <input value={email}
               placeholder={"Email"}
               onChange={(event) => this.handleFieldChange(event, "email")}/>
        <input value={password}
               type={"password"}
               placeholder={"Password"}
               onChange={(event) => this.handleFieldChange(event, "password")}/>
        <div className={"button"}
              onClick={() => {this.createAccount(firstName, lastName, email, password)}}>
          <button>Go!</button>
        </div>
        { this.props.fetching ? <LoadingSpinner/> : undefined }
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