import React, { Component } from "react";

import { Table, Tag, Descriptions } from "antd";

const columns = [
  {
    title: "Company",
    dataIndex: "companyName",
    key: "companyName",
    ellipsis: false,
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Submission Title",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
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
];

class CandidateDashboardTable extends Component {
  state = {};

  render() {
    return (
      <div className="candidate-table-container">
        <Table
          rowKey={(record) => record.positionID}
          columns={columns}
          dataSource={this.props.submissionArr}
          expandRowByClick={true}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ display: "flex" }}>
                {console.log(record)}
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

export default CandidateDashboardTable;
