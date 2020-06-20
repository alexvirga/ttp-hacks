import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  List,
  Spin,
  Form,
  Input,
  InputNumber,
  Modal
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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

class Event extends Component {
state = {
    visible: false,
    loading: false,
    validated: false
}

showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    if (this.state.validated){
        this.setState({
            visible: false, validated: false})
    } 

 
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  
  onFinish = (values) => {
      this.setState({validated: true})
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.user.uid)
      .collection("projects")
      .doc(this.props.event.title)
      .set({
        url: values.user.link,
        github: values.user.github,
        title: values.user.title,
        comment: values.user.comment,
      });
      this.handleOk()
    console.log(values, this.props.user.uid);
  };

  onFinishFailed = errorInfo => {
      this.setState({validated: false})
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <div>
        <h1 className="homepage-header"> {this.props.event.title}</h1>
        <div>
        <Button type="primary" onClick={this.showModal}>
          Submit
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button form="submit-form" key="submit" type="primary" htmlType="submit" loading={this.state.loading} onClick={this.handleOk}>
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
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>

          </Form.Item>
          
        </Form>
        
        </Modal>
      </div>
        
      </div>
    );
  }
}

export default Event;
