import React, { Component } from "react";

import {
  Button,
  Form,
  Input,
  Modal,
  Upload,
  message,
  Select,
  Tooltip,
} from "antd";


import { QuestionCircleOutlined } from '@ant-design/icons';
const { Option } = Select;


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
  console.log(values)

    // this.setState({ validated: true });
    // this.props.createPosition(values, this.state.challengeID, this.state.challengeName);

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
      <div className="create-position-container">
                   <h1> Create Position </h1>

        <div className="company-create-position-form">

            <Form
            layout={"vertical"}
             style={{width: "100%", maxWidth:"700px"}}
              id="submit-form"
              className="position-form"
            
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
                <Input placeholder="Position Title"  style={{borderRadius: "7px"}} />
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
                <Input placeholder="Requisition ID"  style={{borderRadius: "7px"}} />
              </Form.Item>


              <Form.Item
              style={{borderRadius: "7px"}}
                name={["position", "outsideSubmissions"]}
                label={
                  <span>
                    Allow outside submissions? &nbsp;
                    <Tooltip title={<span><p>Do you want to open this position/assessment to Exempla's existing candidate pool?</p> <p>By selecting yes, your listing will be displayed and open to submissions by our candidate pool.   </p></span>}>
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>}
                rules={[
                  {
                    required: true,
                    
                  },
                ]}
              >
                          <Select placeholder="No, this position/assessment is invite only" style={{borderRadius: "7px"}}>
                          <Select.Option value="false">No, this position/assessment is invite only. </Select.Option>
                          <Select.Option value="true">Yes, allow other user's to view and submit assessments. </Select.Option>
        

          </Select>
                   
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
                style={{borderRadius: "7px"}}
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
                <Input placeholder="https://company/job"
                 style={{borderRadius: "7px"}}/>
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
