import React, { Component } from 'react';
import Table from 'antd/lib/table';
import './VisitorLog.css';
import WrapFetch from '../Tools/WrapFetch';

/**
 * 访问日志
 */
class VisitorLogList extends Component {
  componentDidMount() {
    this.onPageChange(1, 10);
  };
  state = { list: [], loading: true, page: 1, pageSize: 10, total: 0 };
  onPageChange = (page, pageSize) => {
    this.setState({ loading: { tip: '正在加载...', spinning: true } });
    WrapFetch.get(
      {
        url: `/api/visitorLog/findByPage`,
        queryParam: { page: page-1, pageSize: pageSize }
      }
    ).then(
      (data) => {
        this.setState({ loading: false, list: data.content, total: data.totalElements, page: data.number+1, pageSize: data.size });
      }
    );
  }

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'IP',
        dataIndex: 'clientIp',
        key: 'clientIp',
      },
      {
        title: '访问方法',
        dataIndex: 'classMethod',
        key: 'classMethod',
      },
      {
        title: '访问时间',
        dataIndex: 'startTime',
        key: 'startTime',
      },
      {
        title: 'IP信息',
        dataIndex: 'clientIpInfo',
        key: 'clientIpInfo.city',
      },
    ];
    return <div className="VisitorLogList">
      <Table dataSource={this.state.list}
        columns={columns} rowKey="id"
        loading={this.state.loading}
        pagination={
          {
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100', '150', '200'],
            onChange: this.onPageChange,
            onShowSizeChange: this.onPageChange,
            pageSize: this.state.pageSize,
            current: this.state.page,
            total: this.state.total
          }
        } />
    </div>;
  }
}

export default VisitorLogList;