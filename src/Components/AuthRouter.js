import firebase from "firebase";
import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Login from "./Login";
import EmployerLogin from "./Employer/EmployerLogin";
import EmployerDashboard from "./Employer/EmployerDashboard";
import UserViewAssessment from "./UserViewAssessment";
import CandidateDashboard from "./CandidateDashboard";
import LandingTwo from "./LandingTwo";

import firebaseConfig from "../Firebase/firebaseConfig";

import Homepage from "./Homepage";
import Event from "./Event";

import "antd/dist/antd.css";
import NavigationBar from "./NavigationBar";
import UserProfile from "./UserProfile";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import EmployerProfilePublic from "./EmployerProfilePublic";

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
    submissionArr: [],
    openPositionsArr: [],
    companyEventsLoading: false
  };

  componentDidMount() {
    this.getCompanyData()
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
          })
          .then(() => this.getCandidateSubmissions());
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

  getCompanyData =  () => {
    this.setState({ companyEventsLoading: true });

    firebase
      .firestore()
      .collectionGroup("positions")
      .where("outsideSubmissions", "==", "true")
      .get()
      .then((querySnapshot) => {
     
        const data = [];
        querySnapshot.docs.forEach((doc) => {
          const positionID = doc.id
          const eventData = doc.data();
          data.push({data: eventData, id: positionID});
        });
        
console.log(data)
        this.setState({ openPositionsArr: data, companyEventsLoading: false });
      })





  }


  signOutUser = () => {
    this.setState({ role: null, user: {}, loggedin: false, role: null });

    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push("/");
      })
      .catch(function (error) {
      });
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

  renderCompany = (routerProps) => {
    let companyID = routerProps.match.params.id;
    let user = this.state.user;
    return <EmployerProfilePublic companyID={companyID} />
  };


  renderPosition = (routerProps) => {
  
    let positionID = routerProps.match.params.position;
    let challenge = routerProps.match.params.challenge;

    return (
      <UserViewAssessment
        user={this.state.user}
        positionID={positionID}
        challenge={challenge}
        loggedin={this.state.loggedin}
      />
    );
  };

  getCandidateSubmissions = async () => {
    const submissionArr = [];
    const submissions = await firebase
      .firestore()
      .collection("candidate-submissions")
      .where("uid", "==", this.state.user.uid)
      .get();
    submissions.forEach((submission) => {
      submissionArr.push(submission.data());
    });
    this.setState({ submissionArr: submissionArr });
  };

  render() {
    return this.state.userLoaded ? (
      <div className="Home">
        {this.state.role === "company" ? null : (
          <NavigationBar
            signOutUser={this.signOutUser}
            userLoaded={this.state.userLoaded}
            loggedin={this.state.loggedin}
            role={this.state.role}
            user={this.state.user}
          />
        )}

        <Switch>
          <Route
            path="/"
            exact
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
                <LandingTwo
                  userLoaded={this.state.userLoaded}
                  loading={this.state.loading}
                  loggedin={this.state.loggedin}
                />
              )
            }
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
            render={() =>
              this.state.userLoaded ? (
                !this.state.loggedin ? (
                  <Redirect
                    to="/landing"
                    loading={this.state.loading}
                    loggedin={this.state.loggedin}
                  />
                ) : this.state.role === "company" ? (
                  <EmployerDashboard
                    loading={this.state.loading}
                    loggedin={this.state.loggedin}
                    userLoaded={this.state.userLoaded}
                    user={this.state.user}
                    signOutUser={this.signOutUser}
                  />
                ) : (
                  <CandidateDashboard
                    user={this.state.user}
                    loggedin={this.state.loggedin}
                    submissionArr={this.state.submissionArr}
                  />
                )
              ) : null
            }
          />

          <Route
            path="/homepage"
            exact
            render={() => (
              <Homepage
                loading={this.state.loading}
                companyEventsLoading={this.state.companyEventsLoading}
                loggedin={this.state.loggedin}
                events={this.state.events}
                openPositionsArr={this.state.openPositionsArr}
                
              />
            )}
          />

          <Route
            path="/user/:id"
            exact
            render={(routerProps) => this.renderUser(routerProps)}
          />

<Route
            path="/company/:id"
            exact
            render={(routerProps) => this.renderCompany(routerProps)}
          />
                    <Route
            path="/event/:id"
            exact
            render={(routerProps) => this.renderEvent(routerProps)}
          />

          <Route
            path="/:position/:challenge"
            exact
            render={(routerProps) => this.renderPosition(routerProps)}
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
      </div>
    ) : (
      <Spin indicator={antIcon} />
    );
  }
}

export default withRouter(AuthRouter);
