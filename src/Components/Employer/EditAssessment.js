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



class EditAssessment extends Component {




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
    this.props.updateAssessment(values);
  };

  onFinishFailed = (errorInfo) => {
    this.setState({ validated: false });
    console.log("Failed:", errorInfo);
  };



  render() {
    return (
      <div>
        <div >
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
            EDIT ASSESSMENT
          </Button>
          <Modal
         width={"70vw"}
         style={{maxWidth: "800px"}}
          destroyOnClose={true}
            title="Edit Assessment"
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
              name={["assessment", "title"]}
              initialValue={this.props.data.title}

              label="Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Assessment Title"
                style={{ borderRadius: "7px" }}
              />
            </Form.Item>

            <Form.Item
              name={["assessment", "overview"]}
              label="Overview"
              initialValue={this.props.data.overview}
              rules={[
                {
                 
                },
              ]}
            >
              <Input.TextArea
                placeholder="Brief introduction to the assessment"
                style={{ borderRadius: "7px", maxWidth: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name={["assessment", "instructions"]}
              label="Instructions"
              initialValue={this.props.data.instructions}
              rules={[
                {
                  
                },
              ]}
            >
              <Input.TextArea
                style={{height: "100px", borderRadius: "7px" , maxWidth: "100%"}}
                placeholder="Detailed instructions on setup, context, and requirements"
              />
            </Form.Item>

            <Form.Item
              name={["assessment", "deliverables"]}
              label="Deliverables"
              initialValue={this.props.data.deliverables}
              rules={[
                {
                  
                },
              ]}
            >
              <Input.TextArea
                placeholder="Required deliverables"
                style={{ height: "100px", borderRadius: "7px" , maxWidth: "100%"}}
              />
            </Form.Item>

            <Form.Item
              name={["assessment", "additionalInfo"]}
              label="Additional Info"
              initialValue={this.props.data.additionalInfo}
            >
              <Input.TextArea
                placeholder="Additional info"
                style={{ borderRadius: "7px", maxWidth: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name={["assessment", "link"]}
              label="link"
              initialValue={this.props.data.link}
              rules={[
                {
                 
                  type: "url",
                },
              ]}
            >
              <Input
                placeholder="Additional links"
                style={{ borderRadius: "10px" }}
              />
            </Form.Item>
            </Form>

          </Modal>
        </div>
      </div>
    );
  }
}

export default EditAssessment;
