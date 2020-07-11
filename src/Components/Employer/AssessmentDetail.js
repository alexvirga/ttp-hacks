import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Redirect } from "react-router-dom";
import { Spin, Avatar, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SubmissionCard from "../SubmissionCard";
import EditProfileModal from "../EditProfileModal";
import EditEmployerProfile from "./EditEmployerProfile";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import firebase from "firebase";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const { Header, Content, Footer, Sider } = Layout;

class AssessmentDetail extends Component {
 

  render() {
    return (
      <div>
        <h1> {this.props.data.data.title} </h1>
        <h1> Overview </h1>
        <p> {this.props.data.data.Overview} </p>
        <h1> Instructions </h1>
        <p> {this.props.data.data.Instructions} </p>
        <h1> Link </h1>
        <p> {this.props.data.data.Link} </p>
        <h1> {console.log(this.props.data)} </h1>
      </div>
    );
  }
}

export default AssessmentDetail;
