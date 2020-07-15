import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Meta } = Card;

class EventCardCompany extends Component {
  state = {};

  render() {
    return (
      <div>
  
        <List.Item>
          <Card
            style={{ width: "320px", margin: "20px" }}
            // cover={
            //   <img src={this.props.event.img} alt="No img" style={{ height: "150px" }} />
            // }
            actions={[
              <Link
                target="_blank"
                to={`/${this.props.event.id}/${this.props.event.data.challengeID}`}
              >
                View Assessment
              </Link>,
            ]}
          >
            <Meta
            style={{ backgroundColor: "white" }}

              avatar={
                this.props.event.data.photo ? (
                  <Avatar
                  
                    style={{ backgroundColor: "white",  float: "none", margin: "10px"}}
                    shape="square"
                    size={64}
                    src={this.props.event.data.photo}
                  />
                ) : (
                  <Avatar
                    shape="square"
                    size={64}
                    style={{ color: "white", backgroundColor: "#8835fe", float: "none", margin: "10px"}}
                  >
                    {this.props.event.data.companyName.slice(0, 1)}
                  </Avatar>
                )
              }
              title={
                <Link
                  target="_blank"
                  to={`/company/${this.props.event.data.companyID}`}
                >
                  <p> {this.props.event.data.companyName}</p>
                </Link>
              }
              description={this.props.event.data.title}
            />
          </Card>
        </List.Item>
      </div>
    );
  }
}

export default EventCardCompany;
