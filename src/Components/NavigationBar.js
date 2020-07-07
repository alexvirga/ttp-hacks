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
            <div className="logo">
              <img className="logo-navbar" src={exem} alt="" />
            </div>
            <div className="Nav-links">
              {this.props.loggedin ? (
                this.props.role === "company" ? (



                    // ------- Company Navbar ------//

                  <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                    <Menu.Item>
                      <Link
                        to="/employer/dashboard"
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontWeight: "800",
                        }}
                      >
                        Dashboard
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
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


                ) : (

                    //-------Candidate Navbar ------//

                  <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                    <Menu.Item>
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
                    <Menu.Item>
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
                    <Menu.Item>
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
