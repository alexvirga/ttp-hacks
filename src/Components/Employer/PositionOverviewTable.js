import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { Table } from "antd";
import firebase from "firebase";

const columns = [
  {
    title: "Position",
    dataIndex: "position",
    key: "position"

  },
  {
    title: "Challenge",
    dataIndex: "challenge",
    key: "challenge",

  },
  {
    title: "Status",
    dataIndex: "status",
    dataIndex: "status",


  },
  {
    title: "Pending",
    dataIndex: "submitted",
    key: "submitted",

  },
  {
    title: "Approved",
    dataIndex: "approved",
    dataIndex: "approved",

  },
  {
    title: "Rejected",
    dataIndex: "rejected",
    dataIndex: "rejected",

  },
];



class PositionOverviewTable extends Component {

  render() {
     
    return (
      <div>
         
        
         <Table columns={columns} dataSource={this.props.submissionTotals} onChange={this.onChange} />
      </div>
    );
  }
}

export default PositionOverviewTable;
