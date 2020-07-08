import React, { Component } from "react";
import { Layout, Menu } from 'antd';
import EmployerProfile from './EmployerProfile'
import CandidateOverview from './CandidateOverview'
import PositionOverview from './PositionOverview'
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
} from '@ant-design/icons';



const { Header, Content, Footer, Sider } = Layout;




class Dashboard extends Component {
  state = {
      currentTab: null,
      company: {}

  };

  componentDidMount(){
      this.getCompanyData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.getCompanyData();
    }
  }

  getCompanyData= () => {
    let uid = this.props.user.uid;
    this.setState({loading: true });
    firebase
      .firestore()
      .collection("companies")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
          this.setState({
            loading: false,
            company: querySnapshot.docs[0].data(),
          });
      });
  }

  selectedTab = (tabname) => {
    const tabs = {
        profile: <EmployerProfile getCompanyData={this.getCompanyData} userLoaded={this.props.userLoaded} user={this.state.company}/>,
        overview: <PositionOverview company={this.state.company} />
        }
      let selectedTab = tabs[tabname]
      this.setState({currentTab: selectedTab})
      
      


  }
  

  render() {

    
    return (
        
        !this.props.loggedin ? <Redirect to="/" /> :
        <div>
        
<Layout style={{
        overflow: 'auto',
        height: '100vh'}} >
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
    <Menu.Item onClick={() => this.selectedTab("profile")} key="1" icon={<UserOutlined />} >
          Profile
          
        </Menu.Item>
        <Menu.Item onClick={() => this.selectedTab("overview")} key="2" icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
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
        <Menu.Item   onClick={this.props.signOutUser} key="8" icon={<ShopOutlined />}>
          Sign Out
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Content style={{ margin: '0px 0px 0px 0px', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: '0px', textAlign: 'center' }}>
          {this.state.currentTab === null ? <EmployerProfile getCompanyData={this.getCompanyData} userLoaded={this.props.userLoaded} user={this.state.company} /> : this.state.currentTab}
          </div>
      </Content>
      
    </Layout>
  </Layout>
  </div>
    )} }

export default Dashboard;
