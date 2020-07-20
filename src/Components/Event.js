import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { Button, Collapse } from "antd";
import SubmitForm from "./SubmitForm";
import SubmissionCard from "./SubmissionCard";
import { CaretDownOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
class Event extends Component {
  state = {
    submissions: [],
    uploading: false,
  };

  postUserSubmission = async (values) => {
    this.setState({ uploading: true });
    const files = values.user.image;

    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "project_img");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/alexvirga/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    this.setState({ img: file.secure_url });

    this.postSubmissionFirebase(values, file);
  };

  postSubmissionFirebase = (values, file) => {
    firebase
      .firestore()
      .collection("submissions")
      .doc()
      .set({
        name: this.props.user.name,
        uid: this.props.user.uid,
        event: this.props.event.title,
        url: values.user.link,
        github: values.user.github,
        title: values.user.title,
        comment: values.user.comment,
        img: file.secure_url,
      })
      .then(() => this.setState({ uploading: false }))
      .then(() => this.getAllSubmissions());
  };

  componentDidMount() {
    this.getAllSubmissions();
  }

  getAllSubmissions = () => {
    firebase
      .firestore()
      .collection("submissions")
      .where("event", "==", this.props.event.title)
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.docs.forEach((doc) => {
          const eventData = doc.data();
          data.push({ id: doc.id, data: eventData });
        });

        this.setState({ submissions: data });
      });
  };

  render() {
    return (
      <div style={{ backgroundColor: "#f4f4f4" }}>
        <div className="event-page-shadow">
          <div
            style={{
              height: "300px",
              backgroundImage: `url(${this.props.event.img})`,
              backgroundSize: "cover",
            }}
          >
            {" "}
          </div>
          <h1 className="homepage-header"> {this.props.event.title}</h1>
          {this.props.loggedin ? (
            <SubmitForm
              postUserSubmission={this.postUserSubmission}
              uploading={this.state.uploading}
            />
          ) : (
            <Button
              type="primary"
              style={{
                marginBottom: "20px",
                background: "black",
                color: "white",
                borderColor: "#413f3f",
                borderRadius: "20px",
                fontWeight: "500",
              }}
            >
              <Link to={`/`}>Log in to Submit</Link>
            </Button>
          )}

          <div className="panel-wrapper">
            <a href="#show" class="show btn" id="show">
              Show Full Challenge
            </a>
            <a href="#hide" class="hide btn" id="hide">
              Hide Full Challenge
            </a>



            <div className="panel">
              <div style={{marginBottom: "35px"}}>
              <h1> INTRO </h1>
            
              {this.props.event.overview.split("&&").map((p) => (
                <p> {p} </p>
              ))}
             
              </div>

              <div style={{marginBottom: "35px"}}>
              <h1> EXAMPLES </h1>
              <span style={{display: "inline-grid"}}> 
              
 {this.props.event.examples.map(example => (

   <a href={example.link} target="_blank"> {example.name} </a>
  
   
 ))}
        </span>  
              </div>

              <div style={{marginBottom: "35px"}}>

              <h1> MISSION </h1>
              {this.props.event.mission.split("&&").map((p) => (
                <p> {p} </p>
              ))}
           
              </div>

              <div style={{marginBottom: "35px"}}>
              <h1> ONE MORE THING... </h1>
            <p> <b>BE CREATIVE AND HAVE FUN!</b> Explore unique designs & fun subjects. Just don’t make a cheese quiz.  </p>
              </div>
              <div style={{marginBottom: "35px"}}>
              <h1> HOW TO SUBMIT </h1>
            <p> Once completed, deploy your project so you can share it with others. Be sure to include a description of your build, as well as a screenshot to be used as a preview. </p>
            <p> <b> Deployment Resources </b></p>
            <ul> 
              <li> <a target="_blank" href="https://pages.github.com/"> Github Pages </a> </li>
              <li> <a target="_blank" href="https://www.heroku.com/"> Heroku </a> </li>
              <li> <a target="_blank" href="https://codepen.io/"> Codepen </a> </li>
              <li> <a target="_blank" href="https://www.netlify.com/"> Codepen </a> </li>
              <li> <a target="_blank" href="https://firebase.google.com/docs/hosting"> Firebase </a> </li>


              </ul>
              </div>
              

            </div>
            <div class="fade"></div>
          </div>
        </div>

        <div className="event-page-shadow-submissions">
          <h1 className="event-header-submissions"> Submissions </h1>


          <SubmissionCard
            data={this.state.submissions}
            currentUID={this.props.user.uid}
            getAllSubmissions={this.getAllSubmissions}
          />
        </div>
      </div>
    );
  }
}

export default Event;
