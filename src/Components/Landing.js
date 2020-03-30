import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
import uiConfig from "../Firebase/uiConfig";
import React, { Component } from "react";

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
