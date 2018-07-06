import React from 'react';
import NavBar from "./NavBar";
import "../styles/components/NavPage.scss";

export default class NavPage extends React.Component {
  render() {
    return (
      <div className="page">
        <NavBar />
        <div className="main-background">
          <div className="main-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}