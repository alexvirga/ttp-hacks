import React, { Component } from "react";
import firebase from "firebase";
import {  Card, List,  } from "antd";
import "antd/dist/antd.css";
import { Link, } from "react-router-dom";
import EditSubmissionForm from "./EditSubmissionForm"
import {
  EditOutlined,

  DeleteOutlined,
} from "@ant-design/icons";

class SubmissionCard extends Component {
  state = {
    editing: false,
    edit: "",
    submission: []
  };

  toggleEdit = (value) => {
    this.setState({editing: value})
  }

  editUserSubmission = (values, file) => {
    let submission = this.state.submission
    console.log(submission)
    firebase.firestore().collection("submissions").doc(submission.id).update({
      url: values.user.link,
      github: values.user.github,
      title: values.user.title,
      comment: values.user.comment,

    });
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
                  {submission.data.uid === this.props.currentUID ? (


                    // editable card
                    <Card
                    
                      cover={
                        <img className="submit-img" src={submission.data.img} />
                      }
                      actions={[
                        <EditOutlined key="edit" onClick={() => this.setState({editing: true, edit: submission.id, submission: submission }) }  />,
                        <DeleteOutlined key="delete" />,
                      ]}
                      style={{ width: 300, margin: "20px" }}
                    >
                      <div className="submission-card-body">
                        <h1> {submission.data.title}</h1>
                       
                        <Link to={`/user/${submission.data.uid}`}>
                          <p> {submission.data.name}</p>
                        </Link>

                        <a href={submission.data.url} target="_blank">
                          View Project
                        </a>
                        <a href={submission.data.github} target="_blank">
                          Repository
                        </a>

                        <p> Comment: {submission.data.comment}</p>
                      </div>
                    </Card>


                  ) : (


                    // non-editable card
                    <Card
                      style={{ width: 300, margin: "20px" }}
                      cover={
                       
                      
                          <img className="submit-img" src={submission.data.img} />
                       
                      }
                    >
                      <div className="submission-card-body">
                        <h1> {submission.data.title}</h1>

                        <Link to={`/user/${submission.data.uid}`}>
                          <p> {submission.data.name}</p>
                        </Link>
                        <a href={submission.data.url} target="_blank">
                          View Project
                        </a>
                        <a href={submission.data.github} target="_blank">
                          Repository
                        </a>

                        <p> Comment: {submission.data.comment}</p>
                      </div>
                    </Card>
                  )}
                </List.Item>
              )}
            />
            {this.state.editing ? 
            <EditSubmissionForm toggleEdit={this.toggleEdit} editUserSubmission={this.editUserSubmission} visible={this.state.editing} subID={this.state.edit} submission={this.state.submission}/> : null }
             
           
          </div>
        </div>
      </div>
    );
  }
}

export default SubmissionCard;
