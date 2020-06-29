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
    // }
    // if (info.file.status === 'done') {
    //   message.success(`${info.file.name} file uploaded successfully`);
    // } else if (info.file.status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  }


  render() {
    
    return (
      <div>
        <div>
          <Button type="primary" onClick={this.showModal}>
            Submit
          </Button>
          <Modal
            title="Submit Project"
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
