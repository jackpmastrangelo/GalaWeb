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
      email: "",
      password: ""
    }
  }

  handleLogin = (email, password) => {
    if (email && password) {
      this.props.dispatch(login(email, password));
    } else {

    }
  };

  handleFieldChange = (event, field) => {
    let change = {};
    change[field] = event.target.value;
    this.setState(change);
  };

  render() {
    const email = this.state.email,
          password = this.state.password,
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
          <input value={email}
                 placeholder={"Email"}
                 onChange={(event) => this.handleFieldChange(event, "email")} />
          <input value={password}
                 type={"password"}
                 placeholder={"Password"}
                 onChange={(event) => this.handleFieldChange(event, "password")} />
          <div className={"button"} onClick={() => { this.handleLogin(email, password)}} >
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