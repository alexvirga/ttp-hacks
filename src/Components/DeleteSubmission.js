import React, { Component } from "react";
import { Button, Modal } from "antd";

class DeleteSubmission extends Component {
  handleOk = (e) => {
    this.props.deleteUserSubmission();
    this.props.toggleDelete(false);
  };

  handleCancel = (e) => {
    this.props.toggleDelete(false);
  };

  onFinish = () => {
    this.handleOk();
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div>
        <div>
          <Modal
            visible={this.props.visible}
            onCancel={this.handleCancel}
            footer={[
              <Button
                key="back"
                onClick={this.handleCancel}
                style={{
                  background: "white",
                  color: "black",
                  borderColor: "#413f3f",
                  borderRadius: "20px",
                  fontWeight: "500",
                }}
              >
                Return
              </Button>,
              <Button
                form="submit-form"
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={this.handleOk}
                style={{
                  background: "black",
                  color: "white",
                  borderColor: "#413f3f",
                  borderRadius: "20px",
                  fontWeight: "500",
                }}
              >
                Delete Project
              </Button>,
            ]}
          >
            <h3> Are you sure you want to delete this project? </h3>
          </Modal>
        </div>
      </div>
    );
  }
}

export default DeleteSubmission;
