import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ttp_logo from "../ttp_logo.png";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;
class NavbarLoggedOut extends Component {
  
  render() {
    return (
      <div className="Navbar">
{/*      
        <div className="Nav-logo"> EXPO </div>
        <div className="Nav-spacer"> </div>
        <div className="Nav-links"> */}
       

        <Layout  className="layout">
          <Header style={{background:"black"}}>
          <div className="logo"><img className="ttp-logo-navbar" src={ttp_logo} /> </div>
          <div className="Nav-links">
            <Menu style={{background: "rgba(255, 255, 255, 0)"}} mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item >
                
                <Link
                  to="/homepage"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Events
                </Link>
              </Menu.Item>

              <Menu.Item >
                <Link                   to="/"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Login/Sign Up
 
                </Link>
              </Menu.Item>
            </Menu>
            </div>
          </Header>
        </Layout>
      </div>
    );
  }
}

export default NavbarLoggedOut;
