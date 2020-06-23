import React, { Component } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

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
              <Button key="back" onClick={this.handleCancel}>
                Return
              </Button>,
              <Button
                form="submit-form"
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={this.handleOk}
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
