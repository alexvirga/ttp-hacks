import React, { Component } from "react";
import { Layout, Menu } from "antd";
import firebase from "firebase";
import { Table, Tag, Space, Descriptions } from "antd";

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
    filters: [
        {
          text: 'Approved',
          value: 'approved',
        },
        {
          text: 'Rejected',
          value: 'rejected',
        },
        {
            text: 'Submitted',
            value: 'submitted',
          },
         
          ],
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
    
    filterMultiple: true,
    onFilter: (value, record) => record.status.indexOf(value) === 0,

  
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
        expandedRowRender: record => 
        <div style={{display: "flex"}}>
        <Descriptions title="User Info" layout="horizontal" column={1}>
    <Descriptions.Item label="Name">{record.name}</Descriptions.Item>
    <Descriptions.Item label="Email">{record.email}</Descriptions.Item>
    <Descriptions.Item label="LinkedIn"><a href={record.linkedin}>Link</a></Descriptions.Item>
  </Descriptions>
          <Descriptions title="Project Info" layout="horizontal" column={1}>
          <Descriptions.Item label="Project Title">{record.title}</Descriptions.Item>
          <Descriptions.Item label="User Notes">{record.notes}</Descriptions.Item>
          <Descriptions.Item label="Project Repository"><a href={record.github}>Link</a></Descriptions.Item>
          <Descriptions.Item label="Project Link"><a href={record.link}>Link</a></Descriptions.Item>

        </Descriptions>
        </div>
  
  ,
      }}/>
      )
  }
}

export default CandidateTable;
