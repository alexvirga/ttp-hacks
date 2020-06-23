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
import SubmissionCard from "./SubmissionCard";
import EditSubmissionForm from "./EditSubmissionForm"

class Event extends Component {
  state = {
    submissions: [],
  };

  postUserSubmission = async (values) => {
    const files = values.user.image;
    console.log(files);
    console.log("values", values);

    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "project_img");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/alexvirga/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    this.setState({ img: file.secure_url });

    console.log(file);
    this.postSubmissionFirebase(values, file);
  };

  postSubmissionFirebase = (values, file) => {
    firebase.firestore().collection("submissions").doc().set({
      name: this.props.user.displayName,
      uid: this.props.user.uid,
      event: this.props.event.title,
      url: values.user.link,
      github: values.user.github,
      title: values.user.title,
      comment: values.user.comment,
      img: file.secure_url,
    });
  };





  componentDidMount() {
    this.getAllSubmissions();
  }

  getAllSubmissions = () => {
    firebase
      .firestore()
      .collection("submissions")
      .where("event", "==", this.props.event.title)
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.docs.forEach((doc) => {
          console.log(doc.id)
          const eventData = doc.data();
          data.push({id: doc.id, data: eventData});
        });
        console.log("data", data);
        this.setState({ submissions: data });
      });
  };

  render() {
    return (
      <div>
        <h1 className="homepage-header"> {this.props.event.title}</h1>
        <div>
          <SubmitForm postUserSubmission={this.postUserSubmission} />
          
          <SubmissionCard
            data={this.state.submissions}
            currentUID={this.props.user.uid}
           
          />
        </div>
      </div>
    );
  }
}

export default Event;
