import React from 'react';
import SignUpBox from "../components/SignUpBox";
import NavBar from "../components/NavBar";

export default class SignUp extends React.Component {
  render(){
   return(
     <div>
       <NavBar />
       <SignUpBox />
     </div>
   )
  }
}