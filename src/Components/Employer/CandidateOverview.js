import React, { Component } from "react";
import { Layout, Menu } from "antd";
import firebase from "firebase";
import CandidateTable from "./CandidateTable";
import { List, Avatar, Button, Skeleton } from "antd";

import { Link } from "react-router-dom";
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

class CandidateOverview extends Component {
  state = {
    submissionArr: [],
    positionCount: 100,
  };

  componentDidMount() {
    this.handlePositions();
  }

  handlePositions = () => {
  //   const positions = this.props.submissions;
  // const positionsSubmissionsArr = []
  //   const positionsLength = positions.length
  //   positions.forEach((pos) => {
  //     positionsSubmissionsArr.push({position: pos.position, submissions: pos.submissions})
  //   })
  //   this.setState({submissionArr: positionsSubmissionsArr ,positionCount: positionsLength})
  

    // const positionCount = positions.length;

    // this.setState({ positionCount: positionCount });
    // positions.forEach((position) => {
    //   // this.setState(positionCount = this.state.positionCount)
    //   this.getsubmissions(position);
    // });
  };

  // getsubmissions = async (position) => {
  //   let positionSubmissions = [];
  //   console.log(position);
  //   const submissions = await firebase
  //     .firestore()
  //     .collection("candidate-submissions")
  //     .where("companyID", "==", this.props.companyID)
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

  render() {
    return( 
    
      <div>
        <h1> {console.log(this.state.submissionArr)} </h1>
        {this.props.submissions.map((submission) => {
          console.log(submission)
          return (
            <div>
              <h1>
                {" "}
                {submission.position.title}}
              </h1>
              <CandidateTable data={submission.submissions} />
            </div>
          );
        })}
      </div>
   
    )
    
    
    
  }
}

export default CandidateOverview;
