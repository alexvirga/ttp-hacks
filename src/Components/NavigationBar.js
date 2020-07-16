import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import exem from "../exempla-logo-3.png";

const { Header } = Layout;
class NavigationBar extends Component {
  render() {
    return (
      <div className="Navbar">
        <Layout className="layout" style={{ background: "white" }}>
          <Header style={{ background: "white" }}>
           
            <Link
                  to="/"
                  style={{ textDecoration: "none", color: "black", fontWeight:"800" }}
                >
                   <div className="logo">
                  <img className="logo-navbar" src={exem} alt="" /> 
                  </div>
                </Link>
           
            <div className="Nav-links">
              {this.props.loggedin ? (
                this.props.role === "company" ? (
                  null

                ) : (

                    //-------Candidate Navbar ------//

                  <Menu mode="horizontal" defaultSelectedKeys={[]}>
                    <Menu.Item  key={"0"}>
                      <Link
                     
                        to="/homepage"
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontWeight: "800",
                        }}
                      >
                        Events
                      </Link>
                    </Menu.Item>
                    <Menu.Item key={"1"}>
                      <Link
                      
                        to={`/user/${this.props.user.uid}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontWeight: "800",
                        }}
                      >
                        Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item  key={"2"}>
                      <Link
                     
                        to="/dashboard"
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontWeight: "800",
                        }}
                      >
                        Dashboard
                      </Link>
                    </Menu.Item>

                    <Menu.Item  key={"3"}>
                      <span
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontWeight: "800",
                        }}
                        onClick={this.props.signOutUser}
                      >
                        Sign Out
                      </span>
                    </Menu.Item>
                  </Menu>
                )

        
              ) : this.props.userLoaded ? (
                  

        //--------- Not logged in Navbar ------ //
               
                <Menu
                  style={{ background: "white" }}
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                >
                  <Menu.Item>
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: "800",
                      }}
                    >
                      Home
                    </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <Link
                      to="/employer/login"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: "800",
                      }}
                    >
                      Employers
                    </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <Link
                      to="/login"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: "800",
                      }}
                    >
                      Candidates
                    </Link>
                  </Menu.Item>
                </Menu>
              ) : null }
            </div>
          </Header>
        </Layout>
      </div>
    );
  }
}

export default NavigationBar;
