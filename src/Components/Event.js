import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { Button } from "antd";
import SubmitForm from "./SubmitForm";
import SubmissionCard from "./SubmissionCard";
import AdminEventForm from "./AdminEventForm"

class Event extends Component {
  state = {
    submissions: [],
    uploading: false
  
  };

  postUserSubmission = async (values) => {
    this.setState({uploading: true})
    const files = values.user.image;

    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "project_img");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/alexvirga/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    this.setState({img: file.secure_url });

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
    })
    .then(() => this.setState({uploading: false}))
    .then(() => this.getAllSubmissions())
    
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
          const eventData = doc.data();
          data.push({ id: doc.id, data: eventData });
        });

        this.setState({ submissions: data });
      });
  };

  render() {
    return (
      <div>
        <div
          style={{
            height: "300px",
            backgroundImage: `url(${this.props.event.img})`,
            backgroundSize: "cover",
          }}
        >
          {" "}
        </div>
        <h1 className="homepage-header"> {this.props.event.title}</h1>
        <h3>
          {" "}
          <b>Description: </b>
          {this.props.event.description}{" "}
        </h3>

        <hr
          style={{
            height: "2px",
            borderWidth: "0",
            color: "#c1c1c1",
            backgroundColor: "#cdcdcd",
            width: "20%",
            marginTop: "20px",
          }}
        />
        <a href={this.props.event.link} target="_blank" rel="noopener noreferrer" >
          <h2 style={{ fontSize: "30px", color: "#1192d0", margin: "10px" }}>
            {" "}
            VIEW CHALLENGE{" "}
          </h2>
        </a>
        <hr
          style={{
            height: "2px",
            borderWidth: "0",
            color: "#c1c1c1",
            backgroundColor: "#cdcdcd",
            width: "20%",
            marginBottom: "20px",
          }}
        />

        <div>
          <h1 className="event-header-submissions"> Submissions </h1>

          {this.props.loggedin ? (
            <SubmitForm postUserSubmission={this.postUserSubmission} uploading={this.state.uploading} />
          ) : (
            <Button type="primary" style={{marginBottom: "20px",background: "black", color: "white",
            borderColor: "#413f3f", borderRadius: "20px", fontWeight: "500"}}>
              <Link to={`/`}>Log in to Submit</Link>
            </Button>
          )}

          <SubmissionCard
            data={this.state.submissions}
            currentUID={this.props.user.uid}
            getAllSubmissions={this.getAllSubmissions}
          />
        </div>
      </div>
    );
  }
}

export default Event;
