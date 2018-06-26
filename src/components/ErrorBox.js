import React from 'react';

export default class ErrorBox extends React.Component {

  //TODO
  render() {
    const message = this.props.message;

    return(
      <div className="error-box">
        <h2>{message}</h2>
      </div>
    )
  }
}