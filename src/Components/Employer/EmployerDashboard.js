import React, { Component } from "react";
import { Layout, Menu } from "antd";
import EmployerProfile from "./EmployerProfile";
import CandidateOverview from "./CandidateOverview";
import PositionOverview from "./PositionOverview";
import firebase from "firebase";
import { Redirect, Link } from "react-router-dom";

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";



const { Header, Content, Footer, Sider } = Layout;

class Dashboard extends Component {
  state = {
    currentTab: null,
    company: [],
    positions: [],
    companyID: "",
    submissions: []
  };

  componentDidMount() {
    this.getCompanyData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.getCompanyData();
    }
  }

  getCompanyData = async () => {
    let uid = this.props.user.uid;
    const positions = await firebase
      .firestore()
      .collectionGroup("positions")
      .where("companyID", "==", uid)
      .get();
    const company = await firebase
      .firestore()
      .collection("companies")
      .where("uid", "==", uid)
      .get();
    // const positionArr = [];
    // let positionSubmissions = [];
    // console.log(positions.docs)
    const submissionsData = []
   const  positionArr = []
    for (let position of positions.docs){
      let positionData = position.data()
      positionArr.push(positionData)
      let submissionsArr = []
      const submissions = await firebase
      .firestore()
      .collection("candidate-submissions")
      .where("positionID", "==", position.id)
      .get()
      submissions.forEach(sub => {
       submissionsArr.push(sub.data())
       
      })
      
      
      submissionsData.push({position: positionData, submissions: submissionsArr})
    }

    console.log(submissionsData)
    const companyData = company.docs[0].data();
    const companyID = company.docs[0].ref.id;
    this.setState({
      submissions: submissionsData,
      
      company: companyData,
      companyID: companyID,
    });






    // submissions.forEach((submission) => {
      
    //   positionSubmissions.push(submission.data());
    // });
    // const addSubmission = this.state.submissionArr.concat({
    //   data: positionSubmissions,
    //   title: position.data.title,
    // });
    // this.setState({ submissionArr: addSubmission });



    //   console.log("position",position.data())
    //   const positionID = position.ref.id;
    //   const positionData = position.data();
    //   // positionArr.push({ id: positionID, data: position.data() });
    // });
  };

  updateCompanyProfile = async () => {
    let uid = this.props.user.uid;
    const company = await firebase
      .firestore()
      .collection("companies")
      .where("uid", "==", uid)
      .get();
    const companyData = company.docs[0].data();
    const companyID = company.docs[0].ref.id;
    this.setState({
      company: companyData,
      companyID: companyID,
    });
  };


  // getsubmissions = async (position) => {
  //   let positionSubmissions = [];
  //   console.log(position);
  //   const submissions = await firebase
  //     .firestore()
  //     .collection("candidate-submissions")
  //     .where("companyID", "==", this.state.companyID)
  //     .where("positionID", "==", position.id)
  //     .get();
  //   submissions.forEach((submission) => {
  //     positionSubmissions.push(submission.data());
  //   });
  //   const addSubmission = this.state.submissionArr.concat({
  //     data: positionSubmissions,
  //     title: position.data.title,
  //   });
  //   this.setState({ submissionArr: addSubmission });
  // };

  selectedTab = (tabname) => {
    const tabs = {
      profile: (
        <EmployerProfile
          getCompanyData={this.updateCompanyProfile}
          userLoaded={this.props.userLoaded}
          user={this.state.company}
        />
      ),
      positionOverview: (
        <PositionOverview
        submissions={this.state.submissions}
          company={this.state.company}
          positions={this.state.positions}
          companyID={this.state.companyID}
        />
      ),
      candidateOverview: (
        <CandidateOverview
        submissions={this.state.submissions}
          company={this.state.company}
          positions={this.state.positions}
          companyID={this.state.companyID}
        />
      ),
    };
    let selectedTab = tabs[tabname];
    this.setState({ currentTab: selectedTab });
  };

  render() {
    return !this.props.loggedin ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Layout
          style={{
            overflow: "auto",
            height: "100vh",
          }}
        >
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item
                onClick={() => this.selectedTab("profile")}
                key="1"
                icon={<UserOutlined />}
              >
                Profile
              </Menu.Item>
              <Menu.Item
                onClick={() => this.selectedTab("positionOverview")}
                key="2"
                icon={<VideoCameraOutlined />}
              >
                Position Overview
              </Menu.Item>
              <Menu.Item
                onClick={() => this.selectedTab("candidateOverview")}
                key="3"
                icon={<VideoCameraOutlined />}
              >
                Candidate Overview
              </Menu.Item>
              <Menu.Item key="4" icon={<BarChartOutlined />}>
                nav 4
              </Menu.Item>
              <Menu.Item key="5" icon={<CloudOutlined />}>
                nav 5
              </Menu.Item>
              <Menu.Item key="6" icon={<AppstoreOutlined />}>
                nav 6
              </Menu.Item>
              <Menu.Item key="7" icon={<TeamOutlined />}>
                nav 7
              </Menu.Item>
              <Menu.Item
                onClick={this.props.signOutUser}
                key="8"
                icon={<ShopOutlined />}
              >
                Sign Out
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Content style={{ margin: "0px 0px 0px 0px", overflow: "initial" }}>
              <div
                className="site-layout-background"
                style={{ padding: "0px", textAlign: "center" }}
              >
                {this.state.currentTab === null ? (
                  <EmployerProfile
                    getCompanyData={this.getCompanyData}
                    userLoaded={this.props.userLoaded}
                    user={this.state.company}
                  />
                ) : (
                  this.state.currentTab
                )}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Dashboard;
