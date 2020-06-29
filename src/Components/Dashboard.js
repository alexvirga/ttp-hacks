import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { Spin, Avatar, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import SubmissionCard from "./SubmissionCard";
import EditProfileModal from "./EditProfileModal"
import { GithubOutlined, LinkedinOutlined, EditOutlined  } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 50}} spin />;


class Dashboard extends Component {
  state = {
    submissions: [],
    user: {},
    invalidProfile: false,
    loading: false
  };

  componentDidMount() {
    this.getProjects();
    this.getUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.getUser();
      this.getProjects();
    }
  }

  getUser = () => {
    let uid = this.props.uid;
    this.setState({loading: true})

    firebase
      .firestore()
      .collection("users")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length < 1) {
          this.setState({ invalidProfile: true });
        } else {
          this.setState({
            invalidProfile: false,
            loading: false,
            user: querySnapshot.docs[0].data(),
          });
        }
      });
  };

  getProjects = () => {
    let uid = this.props.uid;
    firebase
      .firestore()
      .collection("submissions")
      .where("uid", "==", uid)

      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.docs.forEach((doc) => {
          const eventData = doc.data();
          data.push({ id: doc.id, data: eventData });
        });

        this.setState({ submissions: data });
      });
  };



  editUserProfile = async (values) => {
    this.setState({uploading: true})
    const files = values.user.photo;
    console.log(values.user)

    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "project_img");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/alexvirga/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    this.setState({img: file.secure_url });
    this.updateUserFirebase(values, file);
 
  };

  updateUserFirebase = (values, file) => {
      firebase.firestore().collection("users").doc(this.props.user.uid).update({
        bio: values.user.bio,
        email: values.user.email,
        github: values.user.github,
        linkedin: values.user.linkedin,
        name: values.user.name,
        photo: this.state.img,
        uid: this.props.user.uid
    
    })
    .then(() => this.setState({uploading: false}))
    
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Spin indicator={antIcon}/>
        ) : this.state.invalidProfile ? (
          <Redirect to="/" />
        ) : (
          <div>
            <div className="profile-header">
              <Avatar size={190} src={this.state.user.photo} alt="google.com" />
            </div>
<div>
{this.props.user.uid === this.props.uid ? 
<EditProfileModal  user={this.state.user} editUserProfile={this.editUserProfile} uploading={this.state.uploading} /> : null} </div>

            <div className="profile-user-info">
              
              <h1> {this.state.user.name} </h1>
              <p> {this.state.user.bio} </p>
              <div className="profile-socials">
                <a href={this.state.user.linkedin} target="_blank" rel="noopener noreferrer" >
                  <LinkedinOutlined
                    style={{
                      fontSize: "30px",
                      color: "#1192d0",
                      margin: "10px",
                    }}
                  />
                </a>

                <a href={this.state.user.github} target="_blank" rel="noopener noreferrer" >
                  <GithubOutlined
                    style={{ fontSize: "30px", color: "black", margin: "10px" }}
                  />
                </a>
                <p>
                  {" "}
                  <b>{this.state.user.email} </b>{" "}
                </p>
              </div>
            </div>
            <h1 className="event-header-submissions"> Projects </h1>
                    {this.state.submissions.length > 0 ? 
            <SubmissionCard
            data={this.state.submissions}
            currentUID={this.props.user.uid}
          /> : <h3> No Submissions :(</h3>
                    }

          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
