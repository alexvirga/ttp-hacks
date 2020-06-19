import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { Avatar, Button, Card, List} from "antd";
import "antd/dist/antd.css";
const { Meta } = Card;

class Homepage extends Component {
    state= {
        events: []
    }

    componentDidMount(){
        this.getEvents()
    }

    getEvents = () => {
        firebase.firestore()
        .collection("events")
        .get()
        .then((querySnapshot) => {
            const data = []
            querySnapshot.docs.forEach((doc) => {
                const eventData = doc.data()
                data.push(eventData)
            }) 
            this.setState({events: data})
               
            })
             
    }
  render() {
    const user = firebase.auth().currentUser;



    return (
      <div>
        {this.props.loading ? (
          <p>Loading..</p>
        ) : !this.props.loggedin ? (
          <Redirect to="/" />
        ) : (
          <div>
            <div>
              <h1 className="homepage-header"> What's Ahead.</h1>

<List 
className="event-list"
    grid={{ gutter: 16 }}
    dataSource={this.state.events}
    renderItem={event => (
      <List.Item>
                      <Card
                      
                style={{ width: 300, margin: "20px" }}
                cover={
                  <img src={event.img} style={{height: "150px"}} />
                }
                > 
                <Meta title={event.title} description={event.description} />
                </Card>
      </List.Item>
    )}
/>

                
             
            </div>

            <h1 className="homepage-header"> Past Events.</h1>
          </div>
        )}
      </div>
    );
  }
}

export default Homepage;
