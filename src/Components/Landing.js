import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
import uiConfig from "../config";
import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
        <div className="Landing-container">
        <div className="Landing-background">
        </div>
      <div className="Auth-container">
        {this.props.loading ? (<p>Loading..</p>
        ) : this.props.loggedin ? (
        <Redirect to="dashboard" />
        ) : (
        <StyledFirebaseAuth
        className="Auth"
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        )}
      </div>
      </div>
    );
  }
}

export default Landing;
