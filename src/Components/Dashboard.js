import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import uiConfig from "../config";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div>
        {this.props.loading ? (
          <p>Loading..</p>
        ) : !this.props.loggedin ? (
          <React.Fragment>
            <Redirect to="/" />
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </React.Fragment>
        ) : (
          <p>Private stuff here !</p>
        )}
      </div>
    );
  }
}

export default Dashboard;
