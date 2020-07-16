import React, { Component } from "react";
import {List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import EventCard from "./EventCard";
import EventCardCompany from "./EventCardCompany";

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
            <h1 className="homepage-header"> For Show. </h1>
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
          </div>
        )}

 {this.props.openPositionsArr <= 0 ? (
          <Spin indicator={antIcon} />
        ) : (
          <div>
            <h1 className="homepage-header"> For Hire. </h1>
            <div style={{ display: "inline-block" }}>
              <List
                className="event-list"
                grid={{ gutter: 16 }}
                dataSource={this.props.openPositionsArr}
                renderItem={(event) =>
                    <div>
                     
                      <EventCardCompany event={event} />
                    </div>
                  
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
