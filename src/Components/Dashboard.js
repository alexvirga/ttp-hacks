import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  render() {
    const user = firebase.auth().currentUser;

    return (
      <div>
        {this.props.loading ? (
          <p>Loading..</p>
        ) : !this.props.loggedin ? (
          <Redirect to="/" />
        ) : (
          <div>
            <h1> {user.displayName} </h1>
            <h3> {user.email} </h3>
            <img src={user.photoURL} />
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
