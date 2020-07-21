import React, { Component } from "react";
import { Layout, Menu, Button } from "antd";
import EmployerProfile from "./EmployerProfile";
import CandidateOverview from "./CandidateOverview";
import PositionOverview from "./PositionOverview";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import AssessmentDetail from "./AssessmentDetail";
import AddAssessment from "./AddAssessment";
import CreatePosition from "./CreatePosition"
import {
  ShopOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";


const { Content, Sider } = Layout;

class Dashboard extends Component {
  state = {
    currentTab: null,
    company: [],
    positions: [],
    companyID: "",
    submissions: [],
    submissionsLoaded: false,
    challengesLoaded: false,
    challengeData: [],

  };

  componentDidMount() {
    this.getCompanyData();
    this.getChallengeData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.getCompanyData();
    }
  }

  getChallengeData = async () => {
    console.log("in get challenge")
    let uid = this.props.user.uid;
    const challengeArr = [];
    const challenges = await firebase
      .firestore()
      .collection("challenges")
      .where("companyID", "==", uid)
      .get();
    challenges.docs.forEach((challenge) => {
      challengeArr.push({ id: challenge.id, data: challenge.data() });
    });
    this.setState({ challengesLoaded: true, challengeData: challengeArr });
  };

  getCompanyData = async () => {
    this.setState({
      submissionsLoaded: false,
    })
  
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
    const submissionsData = [];
    const positionArr = [];
    for (let position of positions.docs) {
      let positionData = position.data();
      let positionID = position.id;

      positionData = { ...positionData, positionID };
      positionArr.push(positionData);
      let submissionsArr = [];
      const submissions = await firebase
        .firestore()
        .collection("candidate-submissions")
        .where("positionID", "==", position.id)
        .get();
      submissions.forEach((sub) => {
        let submission = sub.data()
        submission["id"] = sub.id
        
        submissionsArr.push(submission);
      });
      submissionsData.push({
        position: positionData,
        positionID: position.id,
        submissions: submissionsArr,
      });
    }
    const companyData = company.docs[0].data();
    const companyID = company.docs[0].ref.id;

    this.setState({
      submissions: submissionsData,
      company: companyData,
      companyID: companyID,
      submissionsLoaded: true,
    });
  };

  createAssessment = (values ) => {
    const obj = JSON.parse(JSON.stringify(values, function(k, v) {
      if (v === undefined) { return null; } return v; 
   }));
   
    firebase.firestore().collection("challenges").doc().set({
      title: obj.assessment.title,
      overview: obj.assessment.overview,
      link: obj.assessment.link,
      instructions: obj.assessment.instructions,
      deliverables: obj.assessment.deliverables,
      additionalInfo: obj.assessment.additionalInfo,
      companyID: this.state.companyID,
      companyName: this.state.company.name,
    }).then(() => this.getChallengeData())
    .then(() => this.selectedTab("candidateOverview"))
    
  };




  createPosition = (values, challengeID, challengeName) => {
    
    firebase
    .firestore()
    .collection("companies")
    .doc(this.state.companyID)
    .collection("positions").add({
      title: values.position.title,
      challengeID: challengeID,
      challengeName: challengeName,
      outsideSubmissions: values.position.outsideSubmissions,
      positionOpen: true,
      reqID: values.position.reqID,
      link: values.position.link,
      companyID: this.state.companyID,
      companyName: this.state.company.name,
      photo: this.state.company.photo

    }).then(() => this.getCompanyData())
    .then(() => this.selectedTab("candidateOverview"))
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

  handlePositionDelete = () => {
    this.getCompanyData()
    this.selectedTab("candidateOverview")

  }

  selectedTab = (tabname, data) => {
    const tabs = {
      profile: (
        <EmployerProfile
      
          getCompanyData={this.updateCompanyProfile}
          userLoaded={this.props.userLoaded}
          user={this.state.company}
        />
      ),

      candidateOverview: (
        <CandidateOverview
       
          submissions={this.state.submissions}
          company={this.state.company}
          companyID={this.state.companyID}
        />
      ),
      viewPosition: (
        <PositionOverview
        handlePositionDelete={this.handlePositionDelete}
          position={data}
          company={this.state.company}
          companyID={this.state.companyID}
        />
      ),
      viewAssessment: <AssessmentDetail data={data} />,

      addAssessment: <AddAssessment createAssessment={this.createAssessment} />,

      addPosition: <CreatePosition createPosition={this.createPosition} challengeData={this.state.challengeData} />,
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
            overflow: "scroll",
            height: "100vh",
          }}
        >
          <Sider
            style={{
            borderRight: "1px solid lightgrey",
              backgroundColor: "white",
              position: "fixed",
              left: 0,
              height: "100vh",
              overflow: "scroll"
            }}
  
          >
            <div className="logo" />

            <Menu 
           
            theme="dark" mode="inline" defaultSelectedKeys={["1"]} style={{backgroundColor: "white"}} >
              <Menu.Item>
                {" "}
                <h1 style={{ color: "black" }}> Overview </h1>{" "}
              </Menu.Item>

              <Menu.Item
                onClick={() => this.selectedTab("profile")}
                key="1"
                icon={<UserOutlined />}
            
              >
                Profile
              </Menu.Item>

    

              <Menu.Item
                onClick={() => this.selectedTab("candidateOverview")}
                key="3"
                icon={<VideoCameraOutlined />}

              >
                Candidate Overview
              </Menu.Item>
              <Menu.Item
                onClick={this.props.signOutUser}
                key="8"
                icon={<ShopOutlined />}
                style={{ color: "black" }}
              >
                Sign Out
              </Menu.Item>
              <div className="horizontal-line"> </div>
              <Menu.Item style={{ }}>
                <h1 style={{ color: "black" }}> Positions </h1>{" "}
              </Menu.Item>
              

              {!this.state.submissionsLoaded
                ? null
                : this.state.submissions.map((sub) => {
                  
               
                    return (
                      
                      <Menu.Item
                    
                        onClick={() => 
                          this.selectedTab("viewPosition", sub)}
                        key={sub.position.positionID}
                        icon={<ShopOutlined />}
                      >
                        {sub.position.title}
                      </Menu.Item>
                    );
                  })}
              <Button
                style={{
                  borderRadius: "20px",
                  background: "#8837fe00",
                  color: "black",
                  margin: "5px",
                
                }}
                onClick={() => this.selectedTab("addPosition")}
              >
                Add New Position{" "}
              </Button>
              <div className="horizontal-line"> </div>

              <Menu.Item >
                <h1 style={{ color: "black" }}> Assessments </h1>{" "}
              </Menu.Item>

              {!this.state.challengesLoaded
                ? null
                : this.state.challengeData.map((challenge) => {
                
                    return (
                      <Menu.Item
                        key={challenge.id}
                        icon={<ShopOutlined />}
                        onClick={() =>
                          this.selectedTab("viewAssessment", challenge)
                        }
                      
                      >
                        {challenge.data.title}
                      </Menu.Item>
                    );
                  })}
              <Button
                style={{
                  borderRadius: "20px",
                  background: "#8837fe00",
                  color: "black",
                  margin: "5px"
                }}
                onClick={() => this.selectedTab("addAssessment")}
              >
                Add New Assessment
              </Button>
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