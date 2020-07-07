import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
import uiConfigCompanies from "../../Firebase/uiConfigCompanies";
import React, { Component } from "react";
import exem from "../../exempla-logo-3.png";

class Login extends Component {
  render() {
    return this.props.loading ? null : this.props.loggedin ? (
      <Redirect to="/employer/dashboard" />
    ) : (
      <div className="login-container">
        <div className="login-background-employer" />
        <div className="Auth-container">
          <img className="exempla-logo" src={exem} alt="" />
          <h1 className="exempla-text"> exempla </h1>
          <p> Candidate Login/Sign up</p>

          <StyledFirebaseAuth
            className="Auth"
            uiConfig={uiConfigCompanies}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    );
  }
}

export default Login;
