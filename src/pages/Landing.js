import React from 'react';
import LoginBox from "../components/LoginBox";
import NavBar from "../components/NavBar";

//This class is the landing page that users will first land on.
export default class Landing extends React.Component {

  render() {
    return (
      <div className="landing-main">
        <NavBar />
        <LoginBox destination={"/dashboard"}/>
      </div>
    )
  }
}