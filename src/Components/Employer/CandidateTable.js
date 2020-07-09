import React, { Component } from "react";
import { Layout, Menu } from "antd";
import firebase from "firebase";
import { Table, Tag, Space } from "antd";

import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Github",
    dataIndex: "github",
    key: "github",
  },
  {
    title: "Project Link",
    dataIndex: "link",
    key: "link",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      if (status === "rejected") {
        return (
          <Tag color={"red"} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      } else if (status === "approved") {
        return (
          <Tag color={"green"} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      } else
        return (
          <Tag color={"blue"} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
    },
  },

  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Approve</a>
        <a>Reject</a>
      </Space>
    ),
  },
];

class CandidateTable extends Component {
  state = {};

  render() {
    return (
    <Table 
    rowKey={"name"}
    columns={columns} 
    dataSource={this.props.data} 
    expandRowByClick={true}
    expandable={{
        expandedRowRender: record => <p style={{ margin: 0 }}>{record.title}</p>,
      }}/>
      )
  }
}

export default CandidateTable;
