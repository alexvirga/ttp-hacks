import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, List } from "antd";
const { Meta } = Card;

class EventCard extends Component {
  state = {};

  render() {
    return (
      <div className="event-card">
        <List.Item >
          <Card
            style={{ width: "320px", margin: "20px"}}
            cover={
              <img src={this.props.event.img} alt="No img" style={{ height: "150px" }} />
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
