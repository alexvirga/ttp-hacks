import React, { Component } from "react";
import firebase from "firebase";
import { Redirect, Link } from "react-router-dom";
import { Avatar, Button, Card, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
const { Meta } = Card;

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
class Homepage extends Component {
  state = {
   
  };




  render() {
    const user = firebase.auth().currentUser;

    return (
      <div>
        <h1 className="homepage-header"> What's Ahead.</h1>
        {this.props.events.length <= 0 ? (
          <Spin indicator={antIcon} />
        ) : (
          <div>
            <div>
              <List
                className="event-list"
                grid={{ gutter: 16 }}
                
                dataSource={this.props.events}
                renderItem={(event) => (
                  <List.Item>
                    <Card

                      style={{ width: 300, margin: "20px" }}
                      cover={
                        <img src={event.img} style={{ height: "150px" }} />
                      }

                      actions={[
                        <Link to={`/event/${event.title.replace(" ","_")}`} style={{ textDecoration: 'none', color:"grey" }}>View Event</Link>

                      ]}
                    >
                        
                      <Meta
                        title={event.title}
                        description={event.description}
                      />
                    </Card>
                   
                  </List.Item>
               
                )}
              />
            </div>
          </div>
        )}
        



        <h1 className="homepage-header"> Past Events.</h1>
        {this.state.loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <div>
              {this.state .pastEvents > 0 ? (
            <div>
                

                    
                
              <List
                className="event-list"
                grid={{ gutter: 16 }}
                dataSource={this.props.pastEvents}
                renderItem={(event) => (
                  <List.Item>
                    <Card
                      style={{ width: 300, margin: "20px" }}
                      cover={
                        <img src={event.img} style={{ height: "150px" }} />
                      }
                    >
                      <Meta
                        title={event.title}
                        description={event.description}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </div> )
            : <h3> There are no past events.</h3>}
          </div>
        )}
      </div>
    );
  }
}

export default Homepage;
