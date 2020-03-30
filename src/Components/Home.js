import firebase from "firebase";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import firebaseConfig from "../Firebase/firebaseConfig";
import Navbar from "./Navbar";

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
        this.setState({ loggedin: true, loading: false }); // User signed in
      } else {
        this.setState({ loggedin: false, loading: false }); // User NOT signed in.
      }
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    return (
      <div className="Home">
        {/* Only display navbar if user is logged in */}
        {this.state.loggedin ? (
          <Navbar
            loading={this.state.loading}
            loggedin={this.state.loggedin}
            singOutUser={this.singOutUser}
          />
        ) : null}
        <Switch>
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

          <Route
            path="*"
            render={() => (
              this.state.loggedin ? (
              <Redirect to="dashboard"
                loading={this.state.loading}
                loggedin={this.state.loggedin} 
              /> ) : 
              <Redirect to="/" />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Home;
