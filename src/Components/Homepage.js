import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { Card, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import EventCard from "./EventCard";
import "antd/dist/antd.css";
const { Meta } = Card;

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
class Homepage extends Component {
  state = {};

  render() {
    const user = firebase.auth().currentUser;

    return (
      <div>
        {this.props.events.length <= 0 ? (
          <Spin indicator={antIcon} />
        ) : (
          <div>
            <div>
              <List
                className="event-list"
                grid={{ gutter: 16 }}
                dataSource={this.props.events}
                renderItem={(event) =>
                  event.status === "current" ? (
                    <div>
                      <h1 className="homepage-header"> What's Ahead.</h1>
                      <EventCard event={event} />
                    </div>
                  ) : null
                }
              />
              </div>
<div>
              <List
                className="event-list"
                grid={{ gutter: 16 }}
                dataSource={this.props.events}
                renderItem={(event) =>
                  event.status === "past" ? (
                    <div>
                      <h1 className="homepage-header"> Past Events.</h1>
                      <EventCard event={event} />
                    </div>
                  ) : null
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Homepage;
