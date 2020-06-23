import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { Card, List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
const { Meta } = Card;

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
class EventCard extends Component {
  state = {};

  render() {
    return (
      <div>
        <List.Item>
          <Card
            style={{ width: "320px", margin: "20px" }}
            cover={
              <img src={this.props.event.img} style={{ height: "150px" }} />
            }
            actions={[
              <Link
                to={`/event/${this.props.event.title.replace(" ", "_")}`}
                style={{ textDecoration: "none", color: "grey" }}
              >
                View Event
              </Link>,
            ]}
          >
            <Meta
              title={this.props.event.title}
              description={this.props.event.description}
            />
          </Card>
        </List.Item>

      </div>
    );
  }
}

export default EventCard;
