import firebase from "firebase";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import firebaseConfig from "../Firebase/firebaseConfig";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Event from "./Event"

firebase.initializeApp(firebaseConfig);


class AuthRouter extends Component {
  state = {
    loggedin: null,
    loading: true,
    events: [],
    eventsLoading: false,
    user: {}
  };

  getEvents = () => {
    this.setState({ eventsLoading: true });
    firebase
      .firestore()
      .collection("events")
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.docs.forEach((doc) => {
          const eventData = doc.data();
          data.push(eventData);
        });
        this.setState({ events: data, eventsLoading: false });
      });
  };



  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.closeOverlay();
      })
      .catch(function(error) {});
  };

  renderEvent = (routerProps) => {
    console.log("props", routerProps)
    let eventId = routerProps.match.params.id.replace("_", " ")
console.log("events", this.state.events)
    let foundEvent = this.state.events.find(eventObj => eventObj.title === eventId)
  return (foundEvent ? <Event event={foundEvent} user={this.state.user} /> : null)
  }

  componentWillMount() {
    
    this.getEvents()
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedin: true, loading: false, user: user }); // User signed in
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
            signOutUser={this.signOutUser}
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
                loading={this.state.eventsLoading}
                loggedin={this.state.loggedin}
                user={this.state.user}
              />
            )}
          />

<Route
            path="/homepage"
            exact
            render={() => (
              <Homepage
                loading={this.state.loading}
                loggedin={this.state.loggedin}
                events={this.state.events}
              />
            )}
          />

<Route
            path="/event/:id"
            render= {routerProps => this.renderEvent(routerProps)

              // <Event
              //   loading={this.state.loading}
              //   loggedin={this.state.loggedin}
              // />
            }
          />

          <Route
            path="*"
            render={() => (
              this.state.loggedin ? (
              <Redirect to="homepage"
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

export default AuthRouter;
