import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

import exem from "../exempla-logo-3.png";

const { Header } = Layout;
class NavbarLoggedOut extends Component {
  render() {
    return (
      <div className="Navbar">
        <Layout className="layout" style={{ background: "white" }}>
          <Header style={{ background: "white" }}>
            <div className="logo">
              <img className="logo-navbar" src={exem} alt="" />
              <p> exempla</p>
            </div>

            <div className="Nav-links">
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
            </div>
          </Header>
        </Layout>
      </div>
    );
  }
}

export default NavbarLoggedOut;
