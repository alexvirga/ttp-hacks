import React, { Component } from "react";
import { Spin, Avatar } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import EditEmployerProfile from "./EditEmployerProfile";
import firebase from "firebase";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

class EmployerProfile extends Component {
  state = {
    visible: false,
    validated: false,
    image: {},
    uploading: false,
    editing: false,
  };

  toggleEdit = (value) => {
    this.setState({ editing: value });
  };

  editCompanyProfile = async (values) => {
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
    this.updateCompanyFirebase(values, file);
  };

  updateCompanyFirebase = (values, file) => {
    firebase
      .firestore()
      .collection("companies")
      .doc(this.props.user.uid)
      .update({
        bio: values.user.bio,
        email: values.user.email,
        website: values.user.website,
        linkedin: values.user.linkedin,
        name: values.user.name,
        photo: this.state.img,
        uid: this.props.user.uid,
      })
      .then(() => this.props.getCompanyData())
      .then(() => this.setState({ uploading: false }));
  };

  render() {
    return (
      <div>
        {this.props.userLoaded ? (
          <div>
            {this.props.loading ? (
              <Spin indicator={antIcon} />
            ) : (
              <div>
                <div className="company-profile-header">
                  <Avatar
                    size={190}
                    src={this.props.user.photo}
                    alt="google.com"
                  />
                </div>
                <div>
                  <EditEmployerProfile
                    user={this.props.user}
                    editCompanyProfile={this.editCompanyProfile}
                    uploading={this.state.uploading}
                    visible={this.state.editing}
                    toggleEdit={this.toggleEdit}
                  />
                </div>

                <div className="company-profile-info">
                  <h1> {this.props.user.name} </h1>
                  <div className="company-bio-container">
                    <h2> Bio </h2>
                    <p> {this.props.user.bio} </p>
                  </div>

                  <div className="profile-socials-company">
                    <h2>Contact: </h2>

                    <p>
                      <b>LinkedIn:</b>{" "}
                      <a href={this.props.user.linkedin}>
                        {" "}
                        {this.props.user.linkedin}{" "}
                      </a>
                    </p>

                    <p>
                      <b>Website:</b>{" "}
                      <a href={this.props.user.website}>
                        {" "}
                        {this.props.user.website}{" "}
                      </a>
                    </p>

                    <p>
                      <b>{this.props.user.email} </b>{" "}
                    </p>
                  </div>
                </div>
                <h1 className="event-header-submissions"> </h1>
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default EmployerProfile;
