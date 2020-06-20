import React, { Component } from "react";
import firebase from "firebase";
import { Redirect, Link } from "react-router-dom";
import { Avatar, Button, Card, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
const { Meta } = Card;

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
class SubmissionCard extends Component {
  state = {
   
  };




  render() {
    
  

    return (
      <div>
        <h1> Submissions </h1>
   
          <div>
            <div>
              <List
                className="event-list"
                grid={{ gutter: 16 }}
                
                dataSource={this.props.data}
                renderItem={(submission) => (
                  <List.Item>
                    <Card
                      style={{ width: 300, margin: "20px" }}
                    >
                        
                        
                        <h1> {submission.title}</h1>
                        <p> {submission.name}</p>
                        <p> Link: {submission.url}</p>
                        <p> Github: {submission.github}</p>
                        <p> Comment: {submission.comment}</p>
                      <Meta
                        title={submission.title}
                        description={submission.description}
                      />
                    </Card>
                   
                  </List.Item>
               
                )}
              />
            </div>
          </div>
  
      </div>
    );
  }
}

export default SubmissionCard;
