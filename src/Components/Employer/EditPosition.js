import React, { Component } from "react";

import firebase from "firebase";
import { Button, Form, Input, Select, Tooltip, Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
const { Option } = Select;

const validateMessages = {
  required: "${label} is required!",
  types: {
    url: "Please enter a valid url",
  },
};



class EditPosition extends Component {




  state = {
    visible: false,
    validated: false,
    image: {},
  };

  componentDidUpdate(prevProps) {
    if (prevProps.uploading !== this.props.uploading) {
      this.updateLoading();
    }
  }

  updateLoading = () => {
    if (!this.props.uploading) {
      this.setState({
        visible: false,
      });
    }
  };



  showModal = () => {
    this.setState({
      visible: true,
    });
  
  };

  handleOk = (e) => {
    if (this.state.validated) {
      this.setState({
        validated: false,
        visible: false,
      });
    }
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  onFinish = (values) => {
    this.setState({ validated: true });
    this.props.updatePosition(values);
  };

  onFinishFailed = (errorInfo) => {
    this.setState({ validated: false });
    console.log("Failed:", errorInfo);
  };



  render() {
    return (
      <div>
        <div>
          <Button
            style={{
              marginTop: "20px",
              background: "black",
              color: "white",
              borderColor: "#413f3f",
              borderRadius: "20px",
              fontWeight: "500",
            }}
            onClick={this.showModal}
          >
            EDIT POSITION
          </Button>
          <Modal
          destroyOnClose={true}
            title="Edit Profile"
            visible={this.state.visible}
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
                loading={this.props.uploading}
                onClick={this.handleOk}
                style={{
                  background: "black",
                  color: "white",
                  borderColor: "#413f3f",
                }}
              >
                Submit
              </Button>,
            ]}
          >
            <Form
              id="submit-form"
              className="event-form"
              name="nest-messages"
              onFinish={this.onFinish}
              validateMessages={validateMessages}
              onFinishFailed={this.onFinishFailed}
              style={{ width: "100%" }}
              layout={"vertical"}
            >
              <Form.Item
                name={["position", "title"]}
                label="Position Title"
                initialValue={this.props.position.title}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  placeholder="Position Title"
                  style={{ borderRadius: "7px", maxWidth: "100%" }}
                />
              </Form.Item>

              <Form.Item
                style={{ borderRadius: "7px" }}
                name={["position", "outsideSubmissions"]}
                initialValue={this.props.position.outsideSubmissions}
                label={
                  <span>
                    Allow outside submissions? &nbsp;
                    <Tooltip
                      title={
                        <span>
                          <p>
                            Do you want to open this position/assessment to
                            Exempla's existing candidate pool?
                          </p>{" "}
                          <p>
                            By selecting yes, your listing will be displayed and
                            open to submissions by our candidate pool.{" "}
                          </p>
                          
                        </span>
                      }
                    >
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                 
                  style={{ borderRadius: "7px", maxWidth: "100%" }}
                >
                  <Select.Option value="false">
                    No, this position/assessment is invite only.{" "}
                  </Select.Option>
                  <Select.Option value="true">
                    Yes, allow other user's to view and submit assessments.{" "}
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                style={{ borderRadius: "7px" }}
                name={["position", "positionOpen"]}
                initialValue={this.props.position.positionOpen}
                label={<span>Position Open? &nbsp;</span>}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Yes, this position is open and accepting candidate submissions"
                  style={{ borderRadius: "7px", maxWidth: "100%" }}
                >
                  <Select.Option value="false">
                    No, this position is closed and not accepting submissions.{" "}
                  </Select.Option>
                  <Select.Option value="true">
                    Yes, this position is open and accepting candidate
                    submissions.{" "}
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name={["position", "link"]}
                label="Position URL"
                initialValue={this.props.position.link}
                rules={[
                  {
                    required: false,
                    type: "url",
                  },
                ]}
              >
                <Input
                  placeholder="https://company/job"
                  style={{ borderRadius: "7px" }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default EditPosition;
