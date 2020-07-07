import React, { Component } from "react";

import {
  Button,
  Form,
  Input,
  Modal,
  Upload,
  message
} from "antd";

import { PoweroffOutlined } from '@ant-design/icons';
import { UploadOutlined } from "@ant-design/icons";


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    url: 'Please enter a valid url',
  },
};

class SubmitForm extends Component {
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
        visible: false})
    }
  }

  normFile = (e) => {
    this.setState({ image: e.file.originFileObj });
    return e.file.originFileObj;
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
        visible: false
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
    this.props.postUserSubmission(values);

  };

  onFinishFailed = (errorInfo) => {
    this.setState({ validated: false });
    console.log("Failed:", errorInfo);
  };

  uploadImg = async (e) => {
    
    this.setState({ image: e });
  };

  handleChange(info) {
    if (info.file) {
      console.log(info.file);}
  }


  render() {
    
    return (
      <div>
        <div>
          <Button type="primary" onClick={this.showModal} style={{ background: "black", color: "white",
                borderColor: "#413f3f", borderRadius: "20px", fontWeight: "500"}}>
            Submit
          </Button>
          <Modal
            title="Submit Project"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel} style={{ marginTop: "20px", background: "white", color: "black",
              borderColor: "#413f3f", borderRadius: "20px", fontWeight: "500"}}>
                Return
              </Button>,
              <Button
                form="submit-form"
                key="submit"
                type="primary"
                htmlType="submit"
                loading={this.props.uploading}
                onClick={this.handleOk}
                style={{ marginTop: "20px", background: "black", color: "white",
                borderColor: "#413f3f", borderRadius: "20px", fontWeight: "500"}}
              >
                Submit
              </Button>,
            ]}
          >
            <Form
              id="submit-form"
              className="event-form"
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
              validateMessages={validateMessages}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                name={["user", "title"]}
                label="Title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "link"]}
                label="Project URL"
                rules={[
                  {
                    required: true,
                    type: "url",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "github"]}
                label="Github"
                rules={[
                  {
                    required: true,
                    type: "url",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name={["user", "comment"]} label="Comment">
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
              ></Form.Item>

              <Form.Item
                name={["user", "image"]}
                valuePropName="picture"
                label="Image"
                multiple="false"
                getValueFromEvent={this.normFile}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Upload  accept=".jpg, .png"name="logo" onChange={this.handleChange} action={this.uploadImg}>
                  <Button>
                    <UploadOutlined /> Click to upload
                  </Button>
                </Upload>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default SubmitForm;
