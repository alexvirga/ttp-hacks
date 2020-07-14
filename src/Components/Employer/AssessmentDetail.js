import React, { Component } from "react";

class AssessmentDetail extends Component {
  render() {
    return (
      <div className="company-assessment-details">
        <h1> {this.props.data.data.companyName} </h1>
        <h2> {this.props.data.data.title} </h2>
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
