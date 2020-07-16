import React, { Component } from "react";
import { Link } from "react-router-dom";

import CandidateDashboardTable from "./CandidateDashboardTable";

class CandidateDashboard extends Component {
  state = {
    submissionArr: [],
    positionCount: 100,
  };

  render() {
    return (
      <div className="candidate-dashboard">
        {this.props.submissionArr.length <= 0 ? 
        <div style={{marginTop: "200px"}}> <h1 style={{fontSize: "20px", fontWeight: "600"}}> You haven't submitted any company assessments yet. </h1>
        <span> <h1> Keep an eye out for new listings on our <Link to="/homepage"> Events Page </Link> </h1></span>
        </div>
      :
      <div className="candidate-dashboard-table-title-container">
      <h1> Submitted Company Assessments </h1>
      <CandidateDashboardTable submissionArr={this.props.submissionArr} />
      </div>
      }

      </div>
    );
  }
}

export default CandidateDashboard;
