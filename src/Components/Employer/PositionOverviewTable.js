import React, { Component } from "react";
import {Tag, Descriptions, Space } from "antd";
import { Table } from "antd";
import { Link } from "react-router-dom";



const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <Link target="_blank" to={`/user/${record.uid}`}>
        {text}
      </Link>),
    ellipsis: false,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
  },
  {
    title: "Github",
    dataIndex: "github",
    key: "github",
    ellipsis: true,
    render: (github) => {
      if (github) {
        return <a href={github}> Github Link </a>;
      } else {
        return <p> No Github Submitted </p>;
      }
    },
  },
  {
    title: "Project Link",
    dataIndex: "link",
    key: "link",
    ellipsis: true,
    render: (link) => {
      if (link) {
        return <a href={link}> Project Link </a>;
      } else {
        return <p> No Link Submitted </p>;
      }
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: [
      {
        text: "Approved",
        value: "approved",
      },
      {
        text: "Rejected",
        value: "rejected",
      },
      {
        text: "Submitted",
        value: "submitted",
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
      <Space size="small" direction="vertical">
        <a>Approve</a>
        <a>Reject</a>
      </Space>
    ),
  },
];

class PositionOverviewTable extends Component {
  render() {
    return (
      <div className="position-overview-table">
      
        <Table
          rowKey={"name"}
          columns={columns}
          dataSource={this.props.data}
          expandRowByClick={true}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ display: "flex" }}>
                <Descriptions title="User Info" layout="horizontal" column={1}>
                  <Descriptions.Item label="Name">
                    {record.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {record.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="LinkedIn">
                    <a href={record.linkedin}>Link</a>
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions
                  title="Project Info"
                  layout="horizontal"
                  column={1}
                >
                  <Descriptions.Item label="Project Title">
                    {record.title}
                  </Descriptions.Item>
                  <Descriptions.Item label="User Notes">
                    {record.notes}
                  </Descriptions.Item>
                  <Descriptions.Item label="Project Repository">
                    <a href={record.github}>Link</a>
                  </Descriptions.Item>
                  <Descriptions.Item label="Project Link">
                    <a href={record.link}>Link</a>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            ),
          }}
        />
      </div>
    );
  }
}

export default PositionOverviewTable;
