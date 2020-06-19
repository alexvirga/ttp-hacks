import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { Avatar, Button, Card, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";



class Event extends Component {


  render() {

    return (
      <div>
        <h1 className="homepage-header"> {this.props.event.title}</h1>
      </div>
    );
  }
}

export default Event;
