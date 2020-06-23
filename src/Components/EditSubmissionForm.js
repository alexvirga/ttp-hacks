import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Upload,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
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

class EditSubmissionForm extends Component {
  state = {
    visible: false,
    loading: false,
    validated: false,
    image: {},
  };

  normFile = (e) => {
    // console.log('Upload event:', e);
    console.log(e.file);
    this.setState({ image: e.file.originFileObj });
    return e.file.originFileObj;
  };

//   showModal = () => {
//     this.setState({
//       visible: true,
//     });
//   };

  handleOk = (e) => {
    if (this.state.validated) {
      this.setState({
        validated: false,
      });
      this.props.toggleEdit(false)
    }
  };

  handleCancel = (e) => {
    console.log(e);
    this.props.toggleEdit(false)
  };

  onFinish = (values) => {
    console.log("values", values);
    this.setState({ validated: true });
    this.props.editUserSubmission(values, this.props.submission.id);
    this.handleOk();
  };

  onFinishFailed = (errorInfo) => {
    this.setState({ validated: false });
    console.log("Failed:", errorInfo);
  };

  uploadImg = async (e) => {
    console.log(e);
    this.setState({ image: e });
  };

  render() {
      
    return (
      <div>
        <div>
          <Button type="primary" onClick={this.showModal}>
            Submit
          </Button>
          <Modal
            title="Submit Project"
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
                loading={this.state.loading}
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
              initialValue={this.props.submission.data.title}
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
                            initialValue={this.props.submission.data.url}

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
                            initialValue={this.props.submission.data.github}

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

              <Form.Item name={["user", "comment"]} label="Comment"               initialValues={this.props.submission.data.title}
              initialValue={this.props.submission.data.comment}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
              ></Form.Item>

              <Form.Item
                            initialValue={this.props.submission.data.img}

                name={["user", "image"]}
                valuePropName="picture"
                label="Image"
                getValueFromEvent={this.normFile}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Upload name="logo" action={this.uploadImg}>
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

export default EditSubmissionForm;
