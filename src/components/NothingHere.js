import React from 'react';

export default class NothingHere extends React.Component {

  //TODO Styling
  render() {
    return (
      <div className="nothing-here">
        <h3>There's nothing here!</h3>
        <h4>{this.props.message}</h4>
      </div>
    )
  }
}