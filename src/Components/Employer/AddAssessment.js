import React, { Component } from "react";

import { Button, Form, Input } from "antd";

const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 0,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    url: "Please enter a valid url",
  },
};

class AddAssessment extends Component {
  state = {
    visible: false,
    validated: false,
    image: {},
  };

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.uploading !== this.props.uploading) {
  //       this.updateLoading();
  //     }
  //   }

  //   updateLoading = () => {
  //     if (!this.props.uploading) {
  //       this.setState({
  //         visible: false})
  //     }
  //   }

  handleOk = (e) => {
    if (this.state.validated) {
      this.setState({
        validated: false,
        visible: false,
      });
    }
  };

  onFinish = (values) => {
    this.setState({ validated: true });
    this.props.createAssessment(values);
  };

  onFinishFailed = (errorInfo) => {
    this.setState({ validated: false });
    console.log("Failed:", errorInfo);
  };

  handleChange(info) {
    if (info.file) {
    }
  }

  render() {
    return (
      <div className="create-assessment-container">
        <h1> Add New Assessment </h1>
        <div className="company-create-assessment-form">
          <Form
            style={{ width: "100%", maxWidth: "700px" }}
            id="submit-form"
            className="assessment-form"
            layout={"vertical"}
            name="nest-messages"
            onFinish={this.onFinish}
            validateMessages={validateMessages}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              name={["assessment", "title"]}
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
              rules={[
                {
                 
                },
              ]}
            >
              <Input.TextArea
                placeholder="Brief introduction to the assessment"
                style={{ borderRadius: "7px" }}
              />
            </Form.Item>

            <Form.Item
              name={["assessment", "instructions"]}
              label="Instructions"
              rules={[
                {
                  
                },
              ]}
            >
              <Input.TextArea
                style={{ height: "100px", borderRadius: "7px" }}
                placeholder="Detailed instructions on setup, context, and requirements"
              />
            </Form.Item>

            <Form.Item
              name={["assessment", "deliverables"]}
              label="Deliverables"
              rules={[
                {
                  
                },
              ]}
            >
              <Input.TextArea
                placeholder="Required deliverables"
                style={{ height: "100px", borderRadius: "7px" }}
              />
            </Form.Item>

            <Form.Item
              name={["assessment", "additionalInfo"]}
              label="Additional Info"
            >
              <Input.TextArea
                placeholder="Additional info"
                style={{ borderRadius: "7px" }}
              />
            </Form.Item>

            <Form.Item
              name={["assessment", "link"]}
              label="Links"
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

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default AddAssessment;
