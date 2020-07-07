import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect, Link } from "react-router-dom";
import uiConfig from "../Firebase/uiConfig";
import React, { Component } from "react";
import exem from "../exempla-logo-3.png";
import { Button } from 'antd';
import candidate from '../candidate.jpeg'
import company from '../company.jpeg'

class LandingTwo extends Component {

  render() {
    return this.props.loading ? null : this.props.loggedin ? (
      <Redirect to="homepage" />
    ) : (
      <div className="landing-container-main">
          <div className="gradient-background">
        <div className="landing-header">
          <h1>Build.</h1>
          <h1 style={{ color: "#FFFF" }}>Showcase.</h1>
          <h1>Get Hired.</h1>
        </div>
        </div>
        <div className="subtitles-container">
        <h2 className="landing-subtitle"> Demonstrate your technical skills. Get noticed by employers. </h2>
        <p className="landing-subtitle-subtext"> Complete technical challenges hosted by companies looking to hire, or build portfolio-worthy projects that make you stand out. </p>
        <div className="landing-login-buttons">
        <Link to="/login" ><Button type="primary" shape="round" size={"large"} style={{color: "white", backgroundColor: "black", fontWeight: "600", borderColor: "black"}} > Get Started. </Button> </Link>
        </div>
        </div>
        <div className="line-break"/>
      
<div className="landing-candidate-info">
    <img className="candidate-img"src={candidate} alt=""/>
    <div className="candidate-info">
    <h1 className="candidate-info-header"> Job Seekers</h1>
    <div >
    <h3> - Participate in coding challenges hosted by actively-hiring companies.</h3>
    <h3> - Flex your coding skills with our weekly portfolio-building challenges.</h3>
    <h3> - Receive updates on the status of your submission. No more follow-ups with recruiters.</h3>
    <h3> - Build and manage your public portfolio. Showcase your builds. Get noticed.  </h3>
    </div>

    </div>
</div>
<div className="line-break"/>
<div className="landing-company-info">
    <div className="company-info">
    <h1 className="company-info-header"> Employers</h1>
    <div >
    <h3> - Publish, Manage, & Monitor your technical challenges and candidates submissions. </h3>
    <h3> - Source quality candidates through our easy to use recruiting dashboard. </h3>
    <h3> - Send private, invite-only challenges to your existing candidate pool.</h3>
    <h3> - Update candidates on their application status. No more back-and-forth emails.</h3>
    </div>

    </div>
    <img className="company-img"src={company} alt=""/>

</div>
      </div>
    );
  }
}

export default LandingTwo;
