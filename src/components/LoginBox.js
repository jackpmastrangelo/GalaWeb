import React from 'react';

//This component is a standard login component for Gala.
export default class LoginBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userNameField: "Username",
      passwordField: "Password"
    }
  }



  handleFieldChange(event, field) {
    let change = {};
    change[field] = event.target.value;
    this.setState(change);
  }

  render() {
    const userNameField = this.state.userNameField,
          passwordField = this.state.passwordField;

    return(
      <div className="login-box">
        <h2>Welcome to Gala!</h2>
        <h3>Please enter your login information below:</h3>
        <input value={userNameField}
               onChange={(event) => this.handleFieldChange.bind(this)(event, "userNameField")} />
        <input value={passwordField}
               onChange={(event) => this.handleFieldChange.bind(this)(event, "capacityField")}/>
        <div className={"button"}>
          <p>Go!</p>
        </div>
      </div>
    )
  }
}