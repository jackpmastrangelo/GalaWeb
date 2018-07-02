import React from 'react';
import SignUpBox from "../components/SignUpBox";

//This class is the landing page that users will first land on.
export default class Landing extends React.Component {

  render() {
    return (
      <div className="landing-main">
        <SignUpBox />
      </div>
    )
  }
}