import React, { Component } from "react";
import {Link, Redirect } from "react-router-dom";
import ttp_logo from '../ttp_logo.png'

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
              <img className="ttp-logo-navbar" src={ttp_logo} />
            <div className="Nav-logo"> MINI HACKS </div>
            <div className="Nav-spacer"> </div>
            <div className="Nav-links">
              
            <ul >
                <Link to="/homepage" style={{ textDecoration: 'none', color:"white" }}>Events</Link>
</ul>
<ul >
                <Link to="/dashboard" style={{ textDecoration: 'none', color:"white" }}>Profile</Link>
</ul>
              <ul onClick={this.props.signOutUser} >
                <Link style={{ textDecoration: 'none', color:"white" }}>Sign Out</Link>
              </ul>
            </div>
      </div>
    );
  }
}

export default Navbar;
