import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import uiConfig from "../config";
import { Redirect, Link } from "react-router-dom";

class Navbar extends Component {
  render() {

    return (
        
   
      <div className="Navbar">
        {this.props.loading ? (
          <p>Loading..</p>
        ) : !this.props.loggedin ? (
            <Redirect to="/" />
        ) : (

        <div className="Nav-container"> 
             <div className="Nav-logo"> Site Name </div> 
            <div className="Nav-spacer"> </div> 
       
          <div className="Nav-links">
          <ul> Menu 1</ul>
             <ul onClick={this.props.singOutUser}> <Link>Sign Out</Link> </ul>

          </div>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
