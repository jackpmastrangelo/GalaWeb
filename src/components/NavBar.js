import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/NavBar.scss';

export default class NavBar extends React.Component {

  render() {
   return(
     <div className="navbar">
       <div className="navbar-elt">
         <NavLink to="/dashboard">
           <h5>My Dashboard</h5>
         </NavLink>
       </div>
       <div className="navbar-elt">
         <NavLink to="/signup">
           <h5>Create an account</h5>
         </NavLink>
       </div>
       <div className="navbar-elt">
         <NavLink to="/events/create">
           <h5>Create an event</h5>
         </NavLink>
       </div>
     </div>
   )
  }
}