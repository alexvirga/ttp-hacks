import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import exem from '../exempla-logo-3.png'


const { Header } = Layout;
class Navbar extends Component {
  
  render() {
    return (
      <div className="Navbar">
{/*      
        <div className="Nav-logo"> EXPO </div>
        <div className="Nav-spacer"> </div>
        <div className="Nav-links"> */}
       

        <Layout  className="layout" style={{background: "white"}}>
          <Header style={{background:"white"}}>
          <div className="logo"> 
          <img className="logo-navbar" src={exem} alt="" />
          </div>
          <div className="Nav-links">
            
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              
              <Menu.Item  >
                <Link
                  to="/homepage"
                  style={{ textDecoration: "none", color: "black", fontWeight:"800" }}
                >
                  Events 
                </Link>
              </Menu.Item>
              <Menu.Item >
                <Link
                  to={`/user/${this.props.user.uid}`}
                  style={{ textDecoration: "none", color: "black", fontWeight:"800"  }}
                >
                  Profile 
                </Link>
              </Menu.Item>
              <Menu.Item >
                <span
                style={{ textDecoration: "none", color: "black", fontWeight:"800"  }} 
                onClick={this.props.signOutUser}
                >
                   Sign Out
                 
                </span>
              </Menu.Item>
              
            </Menu>
            </div>
          </Header>
        </Layout>
      </div>
    );
  }
}

export default Navbar;

