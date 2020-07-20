import React, { Component } from "react";

import { Button, Form, Input, Modal, Upload } from "antd";

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
  required: "${label} is required!",
  types: {
    url: "Please enter a valid url",
  },
};

class EditEmployerProfile extends Component {
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
    this.props.editCompanyProfile(values);
  };

  onFinishFailed = (errorInfo) => {
    this.setState({ validated: false });
    console.log("Failed:", errorInfo);
  };

  uploadImg = async (e) => {
    this.setState({ image: e });
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
            EDIT PROFILE
          </Button>
          <Modal
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
              style={{width: "100%"}}
              layout={"vertical"}
              name="nest-messages"
              onFinish={this.onFinish}
              validateMessages={validateMessages}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                name={["user", "name"]}
                label="Name"
                initialValue={this.props.user.name}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input style={{ borderRadius: "7px" , maxWidth: "100%" }}
 />
              </Form.Item>
              <Form.Item
                name={["user", "email"]}
                label="Email"
                initialValue={this.props.user.email}
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input style={{ borderRadius: "7px" , maxWidth: "100%" }} />
              </Form.Item>

              <Form.Item
                name={["user", "linkedin"]}
                label="LinkedIn"
                initialValue={this.props.user.linkedin}
                rules={[
                  {
                    required: true,
                    type: "url",
                  },
                ]}
              >
                <Input style={{ borderRadius: "7px" , maxWidth: "100%" }} />
              </Form.Item>

              <Form.Item
                name={["user", "website"]}
                label="Website"
                initialValue={this.props.user.website}
                rules={[
                  {
                    required: true,
                    type: "url",
                  },
                ]}
              >
                <Input  style={{ borderRadius: "7px" , maxWidth: "100%" }}/>
              </Form.Item>

              <Form.Item
                name={["user", "bio"]}
                label="Bio"
                initialValue={this.props.user.bio}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea  style={{ borderRadius: "7px" , maxWidth: "100%" }}/>
              </Form.Item>

              <Form.Item
                name={["user", "photo"]}
                valuePropName="picture"
                label="Photo"
                multiple="false"
                initialValue={this.props.user.photo}
                getValueFromEvent={this.normFile}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Upload
                  accept=".jpg, .png"
                  name="logo"
                  onChange={this.handleChange}
                  action={this.uploadImg}
                >
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

export default EditEmployerProfile;
