import React, { Component } from "react";

import CandidateTable from "./CandidateTable";

class CandidateOverview extends Component {
  state = {
    submissionArr: [],
    positionCount: 100,
  };

  render() {
    return (
      <div>
        {this.props.submissions.map((submission) => {
          return (
            <div key={submission.position.title} className="candidate-overview-table">
              <h1>{submission.position.title}</h1>
              <CandidateTable data={submission.submissions} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default CandidateOverview;
