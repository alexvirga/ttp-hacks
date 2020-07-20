import React, { Component } from "react";
import { Input, Modal, Button } from "antd";
import firebase from "firebase";
import PositionOverviewTable from "./PositionOverviewTable";
import EditPosition from "./EditPosition";

class PositionOverview extends Component {
  state = {
    uploading: false,
    editing: false,
    img: "",
    deleteModalVisible: false,
    deleteLoading: false,
  };

  updatePosition = (values, file) => {
    this.setState({ uploading: true });
    firebase
      .firestore()
      .collection("companies")
      .doc(this.props.companyID)
      .collection("positions")
      .doc(this.props.position.positionID)
      .update({
        title: values.position.title,
        outsideSubmissions: values.position.outsideSubmissions,
        link: values.position.link,
        companyID: this.props.companyID,
      })
      .then(() => this.props.getCompanyData())
      .then(() => this.setState({ uploading: false }));
  };

  deletePosition = () => {
    this.setState({ deleteLoading: true });
    firebase
      .firestore()
      .collection("companies")
      .doc(this.props.companyID)
      .collection("positions")
      .doc(this.props.position.positionID)
      .delete()
      .then(() =>
        this.setState({ deleteLoading: false, deleteModalVisible: false })
      ).then(() => this.props.handlePositionDelete())
  };

  showModal = () => {
    this.setState({
      deleteModalVisible: true,
    });
  };

  handleOk = (e) => {
    this.deletePosition();
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      deleteModalVisible: false,
    });
  };

  render() {
    return (
      <div className="position-overview-container">
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
        <EditPosition
          uploading={this.state.uploading}
          updatePosition={this.updatePosition}
          position={this.props.position.position}
        />

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
            value={`https://exempla.io/${this.props.position.position.positionID}/${this.props.position.position.challengeID}`}
            readonly
          />
        </div>

        <div className="position-candidate-container">
          <PositionOverviewTable data={this.props.position.submissions} />
        </div>
        <span style={{ cursor: "pointer" }} onClick={this.showModal}>
          Delete Position?
        </span>
        <Modal
          title="Delete Position?"
          visible={this.state.deleteModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              key="Cancel"
              style={{ borderRadius: "5px" }}
              onClick={this.handleCancel}
            >
              Return
            </Button>,
            <Button
              key="Delete"
              type="primary"
              style={{
                borderRadius: "5px",
                backgroundColor: "#f73131",
                borderColor: "lightgrey",
              }}
              onClick={this.handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          <p>Are you sure?</p>
        </Modal>
      </div>
    );
  }
}

export default PositionOverview;
