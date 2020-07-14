import React, { Component } from "react";

import {
  Button,
  Form,
  Input,
  Modal,
  Upload,
  message,
  Select,
  
} from "antd";

import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

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
    challengeID: null,
    challengeName: ""
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
    this.props.createPosition(values, this.state.challengeID, this.state.challengeName);

  };

  onFinishFailed = (errorInfo) => {
    this.setState({ validated: false });
    console.log("Failed:", errorInfo);
  };


  handleChange = (value) => {
    this.setState({challengeID: value.key, challengeName: value.label[1]}) // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  }


  render() {
    
    return (
      <div>
        <div>

            <Form
              id="submit-form"
              className="position-form"
              {...layout}
              name="nest-messages"
              onFinish={this.onFinish}
              validateMessages={validateMessages}
              onFinishFailed={this.onFinishFailed}
            >


              <Form.Item
                name={["position", "title"]}
                label="Position Title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Position Title" />
              </Form.Item>

              <Form.Item
                name={["position", "reqID"]}
                label="Req ID"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input placeholder="Requisition ID" />
              </Form.Item>


              <Form.Item
                name={["position", "inviteonly"]}
                label="Invite Only"
                rules={[
                  {
                    required: true,
                    
                  },
                ]}
              >
                 <Input.TextArea placeholder="By selecting 'false', this coding assessment will be open to Exempla's candidate pool." />
              </Form.Item>


              <Form.Item
                name={["position", "positionOpen"]}
                label="Position Open?"
                rules={[
                  {
                    required: true,
                   
                  },
                ]}
              >
                <Input.TextArea placeholder="Has the position been opened yet?" /> 
              </Form.Item>

              <Form.Item
                name={["position", "challenge"]}
                label="Assign Assessment"
                rules={[
                  {
                    required: true,
                   
                  },
                ]}
              >
                <Select placeholder="Assessment Name"
                labelInValue={true}
                onChange={this.handleChange}
                > 
                {this.props.challengeData.map(challenge => {
                  
                    return(
                    <Option key={challenge.id} value={challenge.id}> {challenge.data.title} </Option>)
                })}
                </Select>
              </Form.Item>


             
              <Form.Item
                name={["position", "link"]}
                label="Position URL"
                rules={[
                  {
                    required: false,
                    type: "url",
                  },
                ]}
              >
                <Input placeholder="https://company/job"/>
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
