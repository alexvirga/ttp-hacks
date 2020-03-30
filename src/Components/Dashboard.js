import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import uiConfig from "../config";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  render() {
      let user = firebase.auth().currentUser
      console.log(user)

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
            <img src={user.photoURL}/>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
