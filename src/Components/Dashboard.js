import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { Card, List, Spin, Avatar } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SubmissionCard from "./SubmissionCard";
import "antd/dist/antd.css";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 50}} spin />;


class Dashboard extends Component {
  state = {
    submissions: [],
    user: {},
    invalidProfile: false,
    loading: false
  };

  componentDidMount() {
    this.getProjects();
    this.getUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.getUser();
      this.getProjects();
    }
  }

  getUser = () => {
    let uid = this.props.uid;
    this.setState({loading: true})

    firebase
      .firestore()
      .collection("users")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length < 1) {
          this.setState({ invalidProfile: true });
        } else {
          this.setState({
            invalidProfile: false,
            loading: false,
            user: querySnapshot.docs[0].data(),
          });
        }
      });
  };

  getProjects = () => {
    let uid = this.props.uid;
    firebase
      .firestore()
      .collection("submissions")
      .where("uid", "==", uid)

      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.docs.forEach((doc) => {
          const eventData = doc.data();
          data.push({ id: doc.id, data: eventData });
        });

        this.setState({ submissions: data });
      });
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Spin indicator={antIcon}/>
        ) : this.state.invalidProfile ? (
          <Redirect to="/" />
        ) : (
          <div>
            <div className="profile-header">
              <Avatar size={190} src={this.state.user.photo} alt="google.com" />
            </div>
            <div className="profile-user-info">
              <h1> {this.state.user.name} </h1>
              <p> {this.state.user.bio} </p>
              <div className="profile-socials">
                <a href={this.state.user.linkedin} target="_blank">
                  <LinkedinOutlined
                    style={{
                      fontSize: "30px",
                      color: "#1192d0",
                      margin: "10px",
                    }}
                  />
                </a>

                <a href={this.state.user.github} target="_blank">
                  <GithubOutlined
                    style={{ fontSize: "30px", color: "black", margin: "10px" }}
                  />
                </a>
                <p>
                  {" "}
                  <b>{this.state.user.email} </b>{" "}
                </p>
              </div>
            </div>
            <h1> Projects </h1>

            <SubmissionCard
              data={this.state.submissions}
              currentUID={this.props.user.uid}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
