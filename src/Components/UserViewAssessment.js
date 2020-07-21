import React, { Component } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import CandidateExemplaSuggestion from "./CandidateExemplaSuggestion"
import CandidateAssessmentSubmit from "./CandidateAssessmentSubmit";

import firebase from "firebase";

class UserViewAssessment extends Component {
  state = {
    challenge: [],
    uploading: false,
  };
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const challenge = await firebase
      .firestore()
      .collection("challenges")
      .doc(this.props.challenge)
      .get();
    this.setState({ challenge: challenge.data() });
    const companyID = challenge.data().companyID;

    const position = await firebase
      .firestore()
      .collection("companies")
      .doc(companyID)
      .collection("positions")
      .doc(this.props.positionID)
      .get();
    this.setState({ position: position.data() });
  };

  postCandidateSubmission = (values) => {
    this.setState({ uploading: true });
    const obj = JSON.parse(JSON.stringify(values, function(k, v) {
      if (v === undefined) { return null; } return v; 
      
   }));
   let linkedIn = this.props.user.linkedin !== undefined ? this.props.user.linkedin : null
    firebase
      .firestore()
      .collection("candidate-submissions")
      .doc()
      .set({
        challengeID: this.props.challenge,
        challengeName: this.state.challenge.title,
        companyID: this.state.challenge.companyID,
        companyName: this.state.challenge.companyName,
        github: obj.candidate.github,
        link: obj.candidate.link,
        linkedin: linkedIn,
        name: this.props.user.name,
        notes: obj.candidate.notes,
        positionID: this.props.positionID,
        positionTitle: this.state.position.title,
        status: "submitted",
        title: obj.candidate.title,
        uid: this.props.user.uid,
        email: this.props.user.email,
      })
      .then(() => this.setState({ uploading: false }));
  };

  postCandidateExemplaSuggestion = (values) => {
    this.setState({ uploading: true });
    const obj = JSON.parse(JSON.stringify(values, function(k, v) {
      if (v === undefined) { return null; } return v; 
   }));

    firebase
      .firestore()
      .collection("candidate-submissions")
      .doc()
      .set({
        challengeID: this.props.challenge,
        challengeName: this.state.challenge.title,
        companyID: this.state.challenge.companyID,
        companyName: this.state.challenge.companyName,
        name: this.props.user.name,
        notes: obj.candidate.suggestions,
        positionID: this.props.positionID,
        positionTitle: this.state.position.title,
        status: "submitted",
        uid: this.props.user.uid,
        email: this.props.user.email
      })
      .then(() => this.setState({ uploading: false }));
  };

  render() {
    return (
      <div className="company-assessment-details">
        <h1> {this.state.challenge.companyName} </h1>
        <h2> {this.state.challenge.title} </h2>
        <div className="company-assessment-info">
        {this.state.challenge.overview == null ? null :
          <div className="company-assessment-info-container">
            

            <h2> Overview </h2>
            <p> {this.state.challenge.overview} </p>
          </div>
             }
  
        {this.state.challenge.instructions == null ? null :

          <div className="company-assessment-info-container">
            <h2> Instructions </h2>
            <p> {this.state.challenge.instructions} </p>
          </div>
  }
        {this.state.challenge.deliverables == null ? null :

          <div className="company-assessment-info-container">
            <h2> Deliverables </h2>
            <p> {this.state.challenge.deliverables} </p>
          </div>
  }
        {this.state.challenge.additionalInfo == null ? null :

          <div className="company-assessment-info-container">
            <h2> Additional Info </h2>
            <p> {this.state.challenge.additionalInfo} </p>
          </div>
  }

{this.state.challenge.link == null ? null :

          <div className="company-assessment-info-container">
            <h2> Link </h2>
            <a href={this.state.challenge.link}> {this.state.challenge.link}</a>
          </div>
  }
        </div>
        {this.props.loggedin ? (
          this.props.challenge === "7aOJFlOQSixbpEId3G8k" ?           
          <CandidateExemplaSuggestion
          postCandidateExemplaSuggestion={this.postCandidateExemplaSuggestion}
          uploading={this.state.uploading}
        /> :
          <CandidateAssessmentSubmit
            postCandidateSubmission={this.postCandidateSubmission}
            uploading={this.state.uploading}
          />
        ) : (

          <Button
            type="primary"
            style={{
              marginBottom: "20px",
              background: "black",
              color: "white",
              borderColor: "#413f3f",
              borderRadius: "20px",
              fontWeight: "500",
            }}
          >
            <Link to={`/login`}>Log in/Sign up to Submit</Link>
          </Button>
        )}
      </div>
    );
  }
}

export default UserViewAssessment;
