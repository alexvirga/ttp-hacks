import React, { Component } from "react";

import {
  Button,
  Form,
  Input,
  Modal,
  Upload,
  message
} from "antd";

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

class CreatePosition extends Component {
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
        visible: false
      });
    }
  };

 

  onFinish = (values) => {
  
 
    this.setState({ validated: true });
    this.props.createPosition(values);

  };

  onFinishFailed = (errorInfo) => {
    this.setState({ validated: false });
    console.log("Failed:", errorInfo);
  };


  handleChange(info) {
    if (info.file) {
      console.log(info.file);}
  }


  render() {
    
    return (
      <div>
        <div>

            <Form
              id="submit-form"
              className="assessment-form"
              {...layout}
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
                <Input placeholder="Assessment Title" />
              </Form.Item>


              <Form.Item
                name={["assessment", "overview"]}
                label="Overview"
                rules={[
                  {
                    required: true,
                    
                  },
                ]}
              >
                 <Input.TextArea placeholder="Brief introduction to the assessment"/>
              </Form.Item>


              <Form.Item
                name={["assessment", "instructions"]}
                label="Instructions"
                rules={[
                  {
                    required: true,
                   
                  },
                ]}
              >
                <Input.TextArea placeholder="Detailed instructions on setup, context, and requirements" /> 
              </Form.Item>

              <Form.Item
                name={["assessment", "deliverables"]}
                label="Deliverables"
                rules={[
                  {
                    required: true,
                 
                  },
                ]}
              >
                <Input.TextArea placeholder="Required deliverables" /> 
              </Form.Item>


              <Form.Item name={["assessment", "additionalInfo"]} label="Additional Info">
                <Input.TextArea placeholder="Additional info" />
              </Form.Item>

             
              <Form.Item
                name={["assessment", "link"]}
                label="Links"
                rules={[
                  {
                    required: true,
                    type: "url",
                  },
                ]}
              >
                <Input placeholder="Additional links"/>
              </Form.Item>

             
              <Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

              


              {/* <Form.Item
                wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
              ></Form.Item> */}

            </Form>

        </div>
      </div>
    );
  }
}

export default CreatePosition;
