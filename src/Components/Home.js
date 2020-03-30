import firebase from "firebase";
import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
// import {Container,Row,Col} from 'react-bootstrap';
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import firebaseConfig from "../firebaseConfig"


firebase.initializeApp(firebaseConfig);

class Home extends Component {
  state = {
    loggedin: null,
    loading: true
  };

  singOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.closeOverlay();
      })
      .catch(function(error) {});
  };

  componentWillMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedin: true, loading: false });
      } else {
        this.setState({ loggedin: false, loading: false }); //No user is signed in.
      }
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    return (
      <div>
        {this.state.loggedin ? (
          <li onClick={this.singOutUser}>
            <Link>Sign Out</Link>
          </li>
        ) : null}
        <Route
          path="/"
          exact
          render={() => (
            <Landing
              loading={this.state.loading}
              loggedin={this.state.loggedin}
            />
          )}
        />
        <Route
          path="/dashboard"
          exact
          render={() => (
            <Dashboard
              loading={this.state.loading}
              loggedin={this.state.loggedin}
            />
          )}
        />
      </div>
    );
  }
}

export default Home;
