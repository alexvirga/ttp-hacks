import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
import uiConfig from "../Firebase/uiConfig";
import React, { Component } from "react";
import ttp_logo from '../ttp_logo.png'

class Landing extends Component {
  render() {
    return this.props.loading ? (
      <div>Loading..</div>
    ) : this.props.loggedin ? (
      <Redirect to="dashboard" />
    ) : (

      <div className="Landing-container">
        <div className="Landing-background" />
        <div className="Auth-container">
          <img className="ttp-logo" src={ttp_logo} />
          <h1 className="landing-title"> MINI HACKS</h1>
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
