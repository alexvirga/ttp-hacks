import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Tag, Space, Descriptions } from "antd";
import firebase from "firebase";

function CandidateTable(props) {
  const updateSubmissionStatus = (e, status, record) => {
    record.status = status;
    console.log(record);
    firebase
      .firestore()
      .collection("candidate-submissions")
      .doc(record.id)
      .update({
        status: status,
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: false,
      render: (text, record) => (
        <Link target="_blank" to={`/user/${record.uid}`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Submission Title",
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
        <Space size="middle" direction="vertical">
          <a onClick={(e) => updateSubmissionStatus(e, "approved", record)}>
            Approve
          </a>
          <a onClick={(e) => updateSubmissionStatus(e, "rejected", record)}>
            {" "}
            Reject{" "}
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="candidate-table-container">
      <Table
        rowKey={props.data.id}
        columns={columns}
        dataSource={props.data}
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
              <Descriptions title="Project Info" layout="horizontal" column={1}>
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

export default CandidateTable;
