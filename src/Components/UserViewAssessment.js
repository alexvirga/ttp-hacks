import React, { Component } from "react";
import { Layout, Menu, Button} from "antd";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import CandidateAssessmentSubmit from "./CandidateAssessmentSubmit"
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import firebase from "firebase";
import CandidateOverview from "./Employer/CandidateOverview";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const { Header, Content, Footer, Sider } = Layout;

class UserViewAssessment extends Component {

    state = {
        challenge: [],
        uploading: false
    }
    componentDidMount() {
        this.getData()
        console.log(this.props.user)
        
    }

    getData = async ()  => {
        // console.log(this.props.company)
        console.log(this.props.challenge)
        console.log(this.props.positionID)
        // console.log(this.props.positionID)
        // console.log(this.props.challenge)

        // const position = await firebase
        // .firestore()
        // .collection("companies").doc(this.props.company).collection("positions").doc(this.props.positionID)
        // .get();
        // console.log(position.data())

        const challenge = await firebase
        .firestore()
        .collection("challenges").doc(this.props.challenge).get()
        this.setState({challenge: challenge.data()})
        console.log(challenge.data())
    }


    postCandidateSubmission = (values) => {
        console.log(values)
        this.setState({uploading: true})
       

        firebase.firestore().collection("candidate-submissions").doc().set({
            challengeID: this.props.challenge,
            challengeName: this.state.challenge.title,
            companyID: this.state.challenge.companyID,
            github: values.candidate.github,
            link: values.candidate.link,
            linkedIn: this.props.user.linkedin,
            name: this.props.user.name,
            notes: values.candidate.notes,
            positionID: this.props.positionID,
            status: "submitted",
            title: values.candidate.title,
            uid: this.props.user.uid,
            email: values.candidate.email

        
          })
          .then(() => this.setState({uploading: false}))
         
          
        };
    
 


  render() {
    return (
        <div className="company-assessment-details">
        <h1> {this.state.challenge.companyName} </h1>
        <h2> {this.state.challenge.title} </h2>
        <div className="company-assessment-info">
       
       <div className="company-assessment-info-container">
       <h2> Overview </h2>
        <p> {this.state.challenge.overview} </p>
       </div>
        
       <div className="company-assessment-info-container">
        <h2> Instructions </h2>
        <p> {this.state.challenge.instructions} </p>
        </div>

        <div className="company-assessment-info-container">
        <h2> Deliverables </h2>
        <p> {this.state.challenge.deliverables} </p>
</div>

<div className="company-assessment-info-container">
        <h2> Additional Info </h2>
        <p> {this.state.challenge.additionalInfo} </p>
</div>

        <div className="company-assessment-info-container">
        <h2> Link </h2>
        <a href={this.state.challenge.link}> {this.state.challenge.link}</a>
 
        </div>
        </div>
        {this.props.loggedin ? <CandidateAssessmentSubmit postCandidateSubmission={this.postCandidateSubmission} uploading={this.state.uploading} /> : 
                    <Button type="primary" style={{marginBottom: "20px",background: "black", color: "white",
                    borderColor: "#413f3f", borderRadius: "20px", fontWeight: "500"}}>
                      <Link to={`/login`}>Log in/Sign up to Submit</Link>
                    </Button>
        
        }
        
      </div>
    );
  }
}

export default UserViewAssessment;
