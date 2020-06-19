import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { Avatar, Button } from "antd";
import "antd/dist/antd.css";

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
            <div className="profile-header">
              <Avatar size={130} src={user.photoURL} alt="google.com" />
            </div>
            <div className="profile-user-info"> 
            <h1> {user.displayName} </h1>
            <h3> {user.email} </h3>
            </div>

          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
