import React, { Component } from "react";
import EditAssessment from "./EditAssessment"
import firebase from "firebase";

class AssessmentDetail extends Component {
  state = {
    uploading: false
  }

  updateAssessment = async (values) => {
    const obj = JSON.parse(JSON.stringify(values, function(k, v) {
      if (v === undefined) { return null; } return v; 
   }));
    
    this.setState({ uploading: true });
    firebase
    .firestore()
    .collection("challenges")
    .doc(this.props.data.id)
    .update({
      title: obj.assessment.title,
      overview: obj.assessment.overview,
      link: obj.assessment.link,
      instructions: obj.assessment.instructions,
      deliverables: obj.assessment.deliverables,
      additionalInfo: obj.assessment.additionalInfo,
    })
    // .then(() => this.props.getCompanyData())
    .then(() => this.setState({ uploading: false }));
  };


  render() {
    return (
      <div className="company-assessment-details">
        <h1> {this.props.data.data.companyName} </h1>
        <h2> {this.props.data.data.title} </h2>
        <EditAssessment updateAssessment={this.updateAssessment} data={this.props.data.data} uploading={this.state.uploading} />
        <div className="company-assessment-info">
          <div className="company-assessment-info-container">
            <h2> Overview </h2>
            <p> {this.props.data.data.overview} </p>
          </div>

          <div className="company-assessment-info-container">
            <h2> Instructions </h2>
            <p> {this.props.data.data.instructions} </p>
          </div>

          <div className="company-assessment-info-container">
            <h2> Deliverables </h2>
            <p> {this.props.data.data.deliverables} </p>
          </div>

          <div className="company-assessment-info-container">
            <h2> Additional Info </h2>
            <p> {this.props.data.data.additionalInfo} </p>
          </div>

          <div className="company-assessment-info-container">
            <h2> Link </h2>
            <a href={this.props.data.data.link}> {this.props.data.data.link}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default AssessmentDetail;
