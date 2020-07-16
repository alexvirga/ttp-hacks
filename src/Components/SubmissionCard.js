import React, { Component } from "react";
import firebase from "firebase";
import {  Card, List,  } from "antd";
import { Link, } from "react-router-dom";
import EditSubmissionForm from "./EditSubmissionForm"
import DeleteSubmission from "./DeleteSubmission"
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";



class SubmissionCard extends Component {
  state = {
    editing: false,
    edit: "",
    submission: [],
    deleting: false,
    delete: "",
    loading: false,
    img: {}
  };

  toggleEdit = (value) => {
    this.setState({editing: value})
  }

  toggleDelete = (value) => {
    this.setState({deleting: value})
    
  }
  editUserSubmission = async (values) => {
    this.setState({ uploading: true });
    const files = values.user.photo;
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "project_img");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/alexvirga/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    this.setState({ img: file.secure_url });
    this.updateUserSubmissionFirebase(values, file);
  };

  updateUserSubmissionFirebase = (values, file) => {
    this.setState({loading: true})
    let submission = this.state.submission
    firebase.firestore().collection("submissions").doc(submission.id).update({
      url: values.user.link,
      github: values.user.github,
      title: values.user.title,
      comment: values.user.comment,
      img: this.state.img

    })
    .then(() => this.setState({loading: false}))
    .then(() => this.props.getAllSubmissions())
  };
  

  deleteUserSubmission = () => {
    let submission = this.state.submission
    firebase.firestore().collection("submissions").doc(submission.id).delete().then(() => this.props.getAllSubmissions()).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }
  

  render() {
    return (
      <div>


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
                        <img className="submit-img" src={submission.data.img} alt="" />
                      }
                      actions={[
                        <EditOutlined key="edit" onClick={() => this.setState({editing: true, edit: submission.id, submission: submission }) }  />,
                        <DeleteOutlined key="delete"onClick={() => this.setState({deleting: true, delete: submission.id, submission: submission }) } />,
                      ]}
                      style={{ width: 300, margin: "20px" }}
                    >
                      <div className="submission-card-body">
                        <h1> {submission.data.title}</h1>
                       
                        <Link to={`/user/${submission.data.uid}`}>
                          <p> {submission.data.name}</p>
                        </Link>

                        <a href={submission.data.url} target="_blank" rel="noopener noreferrer">
                          <p> View Project </p>
                        </a>
                        <a href={submission.data.github} target="_blank" rel="noopener noreferrer">
                         <p> Repository </p>
                        </a>

                        <p> <b> Description: </b> {submission.data.comment}</p>
                      </div>
                    </Card>


                  ) : (


                    // non-editable card
                    <Card
                      style={{ width: 300, margin: "20px" }}
                      cover={
                       
                      
                          <img className="submit-img" src={submission.data.img} alt="" />
                       
                      }
                    >
                      <div className="submission-card-body">
                        <h1> {submission.data.title}</h1>

                        <Link to={`/user/${submission.data.uid}`}>
                          <p> {submission.data.name}</p>
                        </Link>
                        <a href={submission.data.url} target="_blank" rel="noopener noreferrer">
                          <p> View Project </p>
                        </a>
                        <a href={submission.data.github} target="_blank" rel="noopener noreferrer">
                         <p> Repository </p>
                        </a>

                        <p> <b> Description: </b> {submission.data.comment}</p>
                      </div>
                    </Card>
                  )}
                </List.Item>
              )}
            />
            {this.state.editing ? 
            <EditSubmissionForm toggleEdit={this.toggleEdit} editUserSubmission={this.editUserSubmission} visible={this.state.editing} subID={this.state.edit} submission={this.state.submission} loading={this.state.loading}/>
             : null }

             {this.state.deleting ? 
             <DeleteSubmission toggleDelete={this.toggleDelete} deleteUserSubmission={this.deleteUserSubmission} visible={this.state.deleting} subID={this.state.edit} submission={this.state.submission}/> : null }
                        

           
          </div>
        </div>
      </div>
    );
  }
}

export default SubmissionCard;
