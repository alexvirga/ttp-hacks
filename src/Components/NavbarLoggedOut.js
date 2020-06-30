import React, { Component } from "react";
import { Link } from "react-router-dom";
import ttp_logo from "../ttp_logo.png";
import { Layout, Menu } from "antd";
import exem from '../exem.png'


const { Header } = Layout;
class NavbarLoggedOut extends Component {
  
  render() {
    return (
      <div className="Navbar">

       

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
                <Link                   to="/"
                  style={{ textDecoration: "none", color: "white", fontWeight:"800"  }}
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
