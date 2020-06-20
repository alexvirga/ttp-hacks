import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  List,
  Spin,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import SubmitForm from "./SubmitForm";
import SubmissionCard from "./SubmissionCard"

class Event extends Component {

    state = {
        submissions: []
    }
  postUserSubmission = (values) => {
    firebase
      .firestore()
      .collection("events")
      .doc(this.props.event.title)
      .collection("submissions")
      .doc(this.props.user.uid)
      .set({
        name: this.props.user.displayName,
        uid: this.props.user.uid, 
        url: values.user.link,
        github: values.user.github,
        title: values.user.title,
        comment: values.user.comment,
        submitted: true
      });
  };

  componentDidMount(){
    this.getAllSubmissions()
  }

getAllSubmissions = () => {
    firebase
    .firestore()
    .collection("events")
    .doc(this.props.event.title)
    .collection("submissions")
    .get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.docs.forEach((doc) => {
        const eventData = doc.data();
        data.push(eventData);
      });
     this.setState({submissions: data})
    
    });
};
       
   





  render() {
  
    return (
      <div>
        <h1 className="homepage-header"> {this.props.event.title}</h1>
        <div>
        <SubmitForm postUserSubmission={this.postUserSubmission} />
            <SubmissionCard data={this.state.submissions}/>
        
         
        </div>
      </div>
    );
  }
}

export default Event;
