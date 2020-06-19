import React, { Component } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { Avatar, Button, Card, List, Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
const { Meta } = Card;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
class Homepage extends Component {
    state= {
        events: [],
        loading: false
    }

    componentDidMount(){
        this.getEvents()
    }

    getEvents = () => {
        this.setState({loading: true})
        firebase.firestore()
        .collection("events")
        .get()
        .then((querySnapshot) => {
            const data = []
            querySnapshot.docs.forEach((doc) => {
                const eventData = doc.data()
                data.push(eventData)
            }) 
            this.setState({events: data, loading: false})
               
            })
             
    }
  render() {
    const user = firebase.auth().currentUser;



    return (
      <div>
          <h1 className="homepage-header"> What's Ahead.</h1>
        {this.state.loading ? (
        
          <Spin indicator={antIcon} /> 
        )  : (
          <div>
            <div>
              

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
