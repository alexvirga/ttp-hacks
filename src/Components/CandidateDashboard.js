import React, { Component } from "react";

import CandidateDashboardTable from "./CandidateDashboardTable";

class CandidateDashboard extends Component {
  state = {
    submissionArr: [],
    positionCount: 100,
  };

  render() {
    return (
      <div className="candidate-dashboard">
        <div className="candidate-dashboard-table-title-container">
        <h1> Submitted Company Assessments </h1>
        <CandidateDashboardTable submissionArr={this.props.submissionArr} />
        </div>
      </div>
    );
  }
}

export default CandidateDashboard;
