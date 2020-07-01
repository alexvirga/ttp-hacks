import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
import uiConfig from "../Firebase/uiConfig";
import React, { Component } from "react";
import exem from '../exempla-logo-3.png'

class Landing extends Component {
  render() {
    return this.props.loading ? (
      <div>Loading..</div>
    ) : this.props.loggedin ? (
      <Redirect to="homepage" />
    ) : (

      <div className="Landing-container">
        <div className="Landing-background" />
        <div className="Auth-container">
          <img className="exempla-logo" src={exem} alt="" />
          <h1 className="exempla-text"> exempla </h1>
 
          <StyledFirebaseAuth
            className="Auth"
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
      
    );
  }
}

export default Landing;
