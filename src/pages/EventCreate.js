import React from 'react';
import CreateEventBox from "../components/CreateEventBox";
import NavBar from "../components/NavBar";

export default class EventCreate extends React.Component {
  render() {
    return(
      <div>
        <NavBar />
        <CreateEventBox />
      </div>
    );
  }
}