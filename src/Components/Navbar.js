import React, { Component } from "react";
import {Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
            <div className="Nav-logo"> Site Name </div>
            <div className="Nav-spacer"> </div>
            <div className="Nav-links">
              <ul> Menu 1</ul>
              <ul onClick={this.props.singOutUser}>
                <Link>Sign Out</Link>
              </ul>
            </div>
      </div>
    );
  }
}

export default Navbar;
