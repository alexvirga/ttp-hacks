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


  render() {
    return( 
    
      <div>
        {this.props.submissions.map((submission) => {
          return (
            <div key={submission.position.title}>
              <h1>
                
                {submission.position.title}
               
              </h1>
              <CandidateTable data={submission.submissions}/>
            </div>
          );
        })}
      </div>
   
    )
    
    
    
  }
}

export default CandidateOverview;
