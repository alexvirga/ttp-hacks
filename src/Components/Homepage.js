import React, { Component } from "react";
import {List, Spin, Tooltip} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import EventCard from "./EventCard";
import EventCardCompany from "./EventCardCompany";

import { QuestionCircleOutlined } from "@ant-design/icons";
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
            <p style={{fontWeight: "200", margin: "0px 20px"}}>Flex your coding skills with our weekly portfolio-building challenges</p>
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
          
         <div>
           
         <h1 className="homepage-header"> For Hire.  </h1>
         <p style={{fontWeight: "200", margin: "0px 20px"}}>Assessments hosted by actively-hiring companies</p>

           
           
            </div> 
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
