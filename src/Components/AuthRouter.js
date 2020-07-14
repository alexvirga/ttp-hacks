import firebase from "firebase";
import React, { Component } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import EmployerLogin from "./Employer/EmployerLogin";
import EmployerDashboard from "./Employer/EmployerDashboard";
import UserViewAssessment from "./UserViewAssessment"

import LandingTwo from "./LandingTwo";

import firebaseConfig from "../Firebase/firebaseConfig";

import Homepage from "./Homepage";
import Event from "./Event";


import "antd/dist/antd.css";
import NavigationBar from "./NavigationBar";
import UserProfile from "./UserProfile";

import {List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;


firebase.initializeApp(firebaseConfig);

class AuthRouter extends Component {
  state = {
    loggedin: null,
    loading: true,
    events: [],
    eventsLoading: false,
    user: {},
    role: "",
    userLoaded: false,
  };

  componentDidMount() {
    this.getEvents();
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        // this.setState({loggedin: true})
        firebase
          .firestore()
          .collection("users")
          .where("uid", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            this.setState({
              userLoaded: true,
              role: querySnapshot.docs[0].data().role,
              loggedin: true,
              loading: false,
              user: querySnapshot.docs[0].data(),
            });
          });
      } else {
        this.setState({ userLoaded: true, loggedin: false, loading: false }); // User NOT signed in.
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
      })
  };

  signOutUser = () => {
    this.setState({ loggedin: false, role: null });
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.closeOverlay();

        useHistory.push("/");
      })
      .catch(function (error) {});
  };

  renderEvent = (routerProps) => {
    let eventId = routerProps.match.params.id.replace("_", " ");
    let foundEvent = this.state.events.find(
      (eventObj) => eventObj.title === eventId
    );
    return foundEvent ? (
      <Event
        event={foundEvent}
        user={this.state.user}
        loggedin={this.state.loggedin}
      />
    ) : null;
  };

  renderUser = (routerProps) => {
    let uid = routerProps.match.params.id;
    let user = this.state.user;
    return <UserProfile uid={uid} user={user} loggedin={this.state.loggedin} />;
  };


  renderPosition =  (routerProps) => {
    let positionID = routerProps.match.params.position;

    let challenge = routerProps.match.params.challenge
   
  
   
return <UserViewAssessment user={this.state.user} positionID={positionID} challenge={challenge} loggedin={this.state.loggedin} />
   
  };

  render() {
    return (
      this.state.userLoaded ?  
      <div className="Home">
        {this.state.role === "company" ? null :
<NavigationBar signOutUser={this.signOutUser} userLoaded={this.state.userLoaded} loggedin={this.state.loggedin} role={this.state.role} user={this.state.user} />}

        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <LandingTwo
              userLoaded={this.state.userLoaded}
                loading={this.state.loading}
                loggedin={this.state.loggedin}
              />
            )}
          />

          <Route
            path="/login"
            exact
            render={() => (
              <Login
                loading={this.state.loading}
                loggedin={this.state.loggedin}
              />
            )}
          />

          <Route
            path="/employer/login"
            exact
            render={() => (
              <EmployerLogin
                loading={this.state.loading}
                loggedin={this.state.loggedin}
              />
            )}
          />

          {/* <Route
            path="/employer/"
            exact
            render={() => (
              <EmployerDashboard
                loading={this.state.loading}
                loggedin={this.state.loggedin}
                
                user={this.state.user}
              />
            )}
          /> */}

          <Route
            path="/dashboard"
            exact
            render={() => (
          
              this.state.userLoaded ? 
              this.state.role === "company" ? 
              <EmployerDashboard
                loading={this.state.loading}
                loggedin={this.state.loggedin}
                userLoaded={this.state.userLoaded}
                user={this.state.user}
                signOutUser={this.signOutUser}
              /> : 
                <Redirect
                    to="/landing"
                    loading={this.state.loading}
                    loggedin={this.state.loggedin}
                  /> : null
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
            exact
            render={(routerProps) => this.renderUser(routerProps)}
          />

<Route

            path="/:position/:challenge"
            exact
            render={(routerProps) => 
              this.renderPosition(routerProps)
             

            }
          />

          <Route
            path="/event/:id"
            render={(routerProps) => this.renderEvent(routerProps)}
          />

          <Route
            path="*"
            render={() =>
              this.state.loggedin ? (
                this.state.role === "company" ? (
                  <Redirect
                    to="/dashboard"
                    loading={this.state.loading}
                    loggedin={this.state.loggedin}
                  />
                ) : (
                  <Redirect
                  to={`/user/${this.state.user.uid}`}
                    loading={this.state.loading}
                    loggedin={this.state.loggedin}
                  />
                )
              ) : (
                <Redirect
                  to="/"
                  loading={this.state.loading}
                  loggedin={this.state.loggedin}
                />
              )
            }
          />
        </Switch>
      </div> :           <Spin indicator={antIcon} />

    );
  }
}

export default AuthRouter;
