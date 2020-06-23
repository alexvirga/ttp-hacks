import firebase from "firebase";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Landing from "./Landing";
import firebaseConfig from "../Firebase/firebaseConfig";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Event from "./Event";
import Dashboard from "./Dashboard";


firebase.initializeApp(firebaseConfig);

class AuthRouter extends Component {
  state = {
    loggedin: null,
    loading: true,
    events: [],
    eventsLoading: false,
    user: {},
  };

  componentDidMount() {
    this.getEvents();
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedin: true, loading: false, user: user }); // User signed in
      } else {
        this.setState({ loggedin: false, loading: false }); // User NOT signed in.
      }
    });
  }

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

  // componentDidMount(){
  //   const user = firebase.auth().currentUser;
  //   this.setState({user: user})
  //   console.log(user)
  // }

  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.closeOverlay();
      })
      .catch(function (error) {});
  };

  renderEvent = (routerProps) => {
    let eventId = routerProps.match.params.id.replace("_", " ");
    let foundEvent = this.state.events.find(
      (eventObj) => eventObj.title === eventId
    );
    return foundEvent ? (
      <Event event={foundEvent} user={this.state.user} />
    ) : null;
  };

  renderUser = (routerProps) => {
    let uid = routerProps.match.params.id
    let user = this.state.user
    return <Dashboard uid={uid} user={user} loggedin={this.state.loggedin} loading={this.state.loading}/>;
  };

  // componentWillUnmount() {
  //   this.unregisterAuthObserver();
  // }
  render() {
    return (
      <div className="Home">
        {/* Only display navbar if user is logged in */}
        {this.state.loggedin ? (
          <Navbar
            loading={this.state.loading}
            loggedin={this.state.loggedin}
            signOutUser={this.signOutUser}
            user={this.state.user}
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
            path="/user/:id"
            render={
              (routerProps) => this.renderUser(routerProps)

              // <Event
              //   loading={this.state.loading}
              //   loggedin={this.state.loggedin}
              // />
            }
          />

          <Route
            path="/event/:id"
            render={
              (routerProps) => this.renderEvent(routerProps)

              // <Event
              //   loading={this.state.loading}
              //   loggedin={this.state.loggedin}
              // />
            }
          />

          <Route
            path="*"
            render={() =>
              this.state.loggedin ? (
                <Redirect
                  to="homepage"
                  loading={this.state.loading}
                  loggedin={this.state.loggedin}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default AuthRouter;