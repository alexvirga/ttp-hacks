import React, { Component } from "react";

import CandidateDashboardTable from "./CandidateDashboardTable";

class CandidateDashboard extends Component {
  state = {
    submissionArr: [],
    positionCount: 100,
  };

  render() {
    return (
      <div>
        <CandidateDashboardTable submissionArr={this.props.submissionArr} />
      </div>
    );
  }
}

export default CandidateDashboard;
