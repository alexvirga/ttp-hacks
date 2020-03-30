import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
import uiConfig from "../config";
import React, { Component } from "react";

class Landing extends Component {
  render() {
    return this.props.loading ? (
      <p>Loading..</p>
    ) : this.props.loggedin ? (
      <Redirect to="dashboard" />
    ) : (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    );
  }
}

export default Landing;
