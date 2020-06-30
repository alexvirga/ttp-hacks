import React, { Component } from "react";
import { Link } from "react-router-dom";
import ttp_logo from "../ttp_logo.png";
import { Layout, Menu } from "antd";
import exem from '../exem.png'

const { Header } = Layout;
class Navbar extends Component {
  
  render() {
    return (
      <div className="Navbar">
{/*      
        <div className="Nav-logo"> EXPO </div>
        <div className="Nav-spacer"> </div>
        <div className="Nav-links"> */}
       

        <Layout  className="layout">
          <Header style={{background:"black"}}>
          <div className="logo"> 
          <img className="logo-navbar" src={exem} alt="" />
          </div>
          <div className="Nav-links">
            
            <Menu style={{background: "rgba(255, 255, 255, 0)"}} mode="horizontal" defaultSelectedKeys={["1"]}>
              
              <Menu.Item >
                <Link
                  to="/homepage"
                  style={{ textDecoration: "none", color: "white", fontWeight:"800" }}
                >
                  Events 
                </Link>
              </Menu.Item>
              <Menu.Item >
                <Link
                  to={`/user/${this.props.user.uid}`}
                  style={{ textDecoration: "none", color: "white", fontWeight:"800"  }}
                >
                  Profile 
                </Link>
              </Menu.Item>
              <Menu.Item >
                <span
                style={{ textDecoration: "none", color: "white", fontWeight:"800"  }} 
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

