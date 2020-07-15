import React, { Component } from "react";
import { Spin, Avatar } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import firebase from "firebase";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

class EmployerProfilePublic extends Component {
  state = {
    loaded: false,
    company: [],
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    let companyID = this.props.companyID;
    const company = await firebase
      .firestore()
      .collection("companies")
      .where("uid", "==", companyID)
      .get();
    const companyInfo = company.docs[0].data();
    this.setState({ company: companyInfo });
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <div className="company-profile-header">
              <Avatar
                size={190}
                src={this.state.company.photo}
                alt="google.com"
              />
            </div>

            <div className="company-profile-info">
              <h1> {this.state.company.name} </h1>
              <div className="company-bio-container">
                <h2> Bio </h2>
                <p> {this.state.company.bio} </p>
              </div>

              <div className="profile-socials-company">
                <h2>Contact: </h2>

                <p>
                  <b>LinkedIn:</b>
                  <a href={this.state.company.linkedin}>
                    {this.state.company.linkedin}
                  </a>
                </p>

                <p>
                  <b>Website:</b>
                  <a href={this.state.company.website}>
                    {this.state.company.website}
                  </a>
                </p>

                <p>
                  <b>{this.state.company.email} </b>
                </p>
              </div>
            </div>
            <h1 className="event-header-submissions"> </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployerProfilePublic;
