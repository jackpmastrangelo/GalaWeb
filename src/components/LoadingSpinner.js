import React from 'react';
import "../styles/components/LoadingSpinner.scss";

export default class LoadingSpinner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="loading-spinner"/>
    )
  }
}
