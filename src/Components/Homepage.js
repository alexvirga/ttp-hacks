import React, { Component } from "react";
import {List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import EventCard from "./EventCard";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
class Homepage extends Component {
  state = {};

  render() {
    

    return (
      <div>
        {this.props.events.length <= 0 ? (
          <Spin indicator={antIcon} />
        ) : (
          <div>
            <h1 className="homepage-header"> What's Ahead.</h1>
            <div style={{ display: "inline-block" }}>
              <List
                className="event-list"
                grid={{ gutter: 16 }}
                dataSource={this.props.events}
                renderItem={(event) =>
                  event.status === "current" ? (
                    <div>
                      <EventCard event={event} />
                    </div>
                  ) : null
                }
              />
            </div>
            <div>
              <h1 className="homepage-header"> Past Events.</h1>
              <List
                className="event-list"
                grid={{ gutter: 16 }}
                dataSource={this.props.events}
                renderItem={(event) =>
                  event.status === "past" ? (
                    <div>
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
