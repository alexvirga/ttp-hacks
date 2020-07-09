import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { Table } from "antd";
import firebase from "firebase";
import PositionOverviewTable from "./PositionOverviewTable";

class PositionOverview extends Component {
  state = {
    positions: [],
    positionChallenges: [],
    submissionTotals: null,
    loaded: false,
  };

  componentDidMount() {
    this.handlePositions()
  }

  handlePositions = () => {
      const positions = this.props.positions
      positions.forEach(position => {
          this.getsubmissions(position)
      })
      
   




  }

  getsubmissions = async (position) => {
    const submissions = await firebase.firestore().collection('candidate-submissions').where("companyID", "==", this.props.companyID).where("positionID", "==", position.id).get();


  }


  render() {
    return <div></div>;
  }
}

export default PositionOverview;
