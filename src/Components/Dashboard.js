import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { Avatar, Button } from "antd";
import SubmissionCard from "./SubmissionCard"
import "antd/dist/antd.css";


class Dashboard extends Component {

  state = {
    submissions: [],
    user: {}
  }

  componentDidMount(){
    this.getProjects()
    this.getUser()
 
  }

  componentDidUpdate(prevProps, prevState){
    if( prevProps !== this.props) {
      this.getUser()
      this.getProjects()
    } }
 

  getUser = () => {
      let uid = this.props.uid
      console.log(uid)
      firebase
          .firestore()
          .collection("users")
          .where("uid", "==", uid)
          .get()
          .then((querySnapshot) => {
            this.setState({ user: querySnapshot.docs[0].data() });
            console.log()
          })
          console.log("userObj", uid);

      };
  

getProjects = () => {
  let uid = this.props.uid
    firebase
      .firestore()
      .collection("submissions")
      .where("uid", "==", uid)

      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.docs.forEach((doc) => {
          const eventData = doc.data();
          data.push(eventData);
        });
        console.log("data", data);
        this.setState({ submissions: data });
      });
  };

  render() {


    return (
      <div>

        {this.props.loading ? (
          <p>Loading..</p>
        ) : !this.props.loggedin ? (
          <Redirect to="/" />
        ) : (
          <div>
            <div className="profile-header">
              <Avatar size={130} src={this.state.user.photo} alt="google.com" />
            </div>
            <div className="profile-user-info"> 
            <h1> {this.state.user.name} </h1>
            <h3> {this.state.user.email} </h3>
            </div>

            <SubmissionCard data={this.state.submissions} currentUID={this.props.user.uid} />


          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
