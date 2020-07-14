import React, { Component } from "react";
import { Input } from "antd";

import PositionOverviewTable from "./PositionOverviewTable";

class PositionOverview extends Component {
  render() {
    return (
      <div className="position-overview-container">
        {console.log(this.props.position)}
        <div className="position-info-container">
          <span>
            <p> Position Title </p>
            <h1> {this.props.position.position.title} </h1>
          </span>
          <div className="vertical-line" />
          <span style={{ textAlign: "center" }}>
            <p> Candidates </p>
            <h1> {this.props.position.submissions.length} </h1>
          </span>
          <div className="vertical-line" />

          <span>
            <p> Assessment </p>
            <h1> {this.props.position.position.challengeName} </h1>
          </span>
        </div>

        <div className="position-details-container">
          <span>
            <p> Position Status </p>
            <h1>
              {" "}
              {this.props.position.position.positionOpen
                ? "Open"
                : "Closed"}{" "}
            </h1>
          </span>
          <div className="vertical-line" />
          <span>
            <p> Invite Only </p>
            <h1>
              {" "}
              {this.props.position.position.inviteonly ? "True" : "False"}{" "}
            </h1>
          </span>
          <div className="vertical-line" />
          <span>
            <p> Days to Close </p>
            <h1> 0 </h1>
          </span>
        </div>

        <div className="position-link-container">
          <p>
            {" "}
            <b>Assessment Link </b>{" "}
          </p>
          <Input
            style={{ width: "200px", margin: "0px 20px" }}
            spellcheck="false"
            type="text"
            id="country"
            name="country"
            value={`http://localhost:3000/${this.props.position.position.positionID}/${this.props.position.position.challengeID}`}
            readonly
          />
        </div>

        <div className="position-candidate-container">
          <PositionOverviewTable data={this.props.position.submissions} />
        </div>
      </div>
    );
  }
}

export default PositionOverview;
