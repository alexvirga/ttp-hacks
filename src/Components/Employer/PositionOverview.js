import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { Table } from "antd";
import firebase from "firebase";
import PositionOverviewTable from './PositionOverviewTable'


class PositionOverview extends Component {

    state = {
        positions: [],
        positionChallenges: [],
        submissionTotals: null,
        loaded: false
       
    }


    componentDidMount() {
        // this.getCompanyPositions();
      }
    
      getCompanyPositions = () => {
          
        firebase
          .firestore()
          .collection("positions")
          .where("companyID", "==", this.props.company.uid)
          .get()
          .then((querySnapshot) => {
            const data = [];
            querySnapshot.docs.forEach((doc) => {
              const positionData = doc.data();
              data.push({title: positionData.title, positionID: doc.id, challengeID: positionData.challengeID, challengeTitle: positionData.challengeTitle})
            })
            this.setState({positions: data})
            
          })
          .then(() =>  this.getSubmissions())
      };

        
      
        
    
      

      getSubmissions = () => {
          const submissionTotals = []
          
        this.state.positions.forEach((position) => {
        firebase
        .firestore()
        .collection("candidate-submissions")
        .where("positionID", "==", `${position.positionID}`)
        .get()
        .then((querySnapshot) => {
            let statusTotals = {position: position.title, challenge: position.challengeTitle, approved: 0, rejected: 0, submitted: 0}
          querySnapshot.docs.forEach((doc) => {
              const submissionData = doc.data()
              statusTotals[submissionData.status] += 1 
              
        
          });
          submissionTotals.push(statusTotals)
  
          
        })

        this.setState({submissionTotals: submissionTotals, loaded: true})
        
    })
    console.log(submissionTotals)
       
    };


      



  render() {
    return (
      <div>
          <h1> Hi </h1>
      </div>
    );
  }
}

export default PositionOverview;
