import React, { Component } from "react";
import firebase from "firebase";
import { Redirect, Link } from "react-router-dom";
import { Avatar, Button, Card, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
class SubmissionCard extends Component {
  state = {};

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
                  {submission.uid === this.props.currentUID ? (
                    <Card
                      cover={
                        <img className="submit-img" src={submission.img} />
                      }
                      actions={[
                        <EditOutlined key="edit" />,
                        <DeleteOutlined key="delete" />,
                      ]}
                      style={{ width: 300, margin: "20px" }}
                    >
                      <div className="submission-card-body">
                        <h1> {submission.title}</h1>
                        <p> {submission.name}</p>
                        <a href={submission.url} target="_blank">
                          View Project
                        </a>
                        <a href={submission.github} target="_blank">
                          Repository
                        </a>

                        <p> Comment: {submission.comment}</p>
                      </div>
                    </Card>
                  ) : (
                    <Card
                      style={{ width: 300, margin: "20px" }}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                    >
                      <div className="submission-card-body">
                        <h1> {submission.title}</h1>
                        <p> {submission.name}</p>
                        <a href={submission.url} target="_blank">
                          View Project
                        </a>
                        <a href={submission.github} target="_blank">
                          Repository
                        </a>

                        <p> Comment: {submission.comment}</p>
                      </div>
                    </Card>
                  )}
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
