import React, { Component } from 'react';
import WrapFetch from '../../Tools/WrapFetch';
import ThinkContent from './ThinkContent';
import DocumentType from '../../Constant/DocumentType';
import { message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { Scrollbars } from 'react-custom-scrollbars';

class ThinkList extends Component {
  state = {
    list: [{ title: '1', content: '1' }, { title: '2', content: '2' }, { title: '3', content: '3' }, { title: '4', content: '4' }],
    loading: true,
    // start 滚动加载
    scrollLoading: false,// 是否正在滚动加载
    hasMore: false,
    pageNum: 1,
    pageSize: 30,
    total: 0
    // end
  };
  // 获取下一页信息
  getMore = () => {
    if (this.state.total === this.state.list.length) {
      return;
    }
    this.setState({
      scrollLoading: true,
      pageNum: this.state.pageNum + 1
    }, () => {
      this.getMoreData(); //请求数据接口
    });
  }
  componentDidMount() {
    this.getFirstData();
  }
  getFirstData = () => {
    this.setState({ loading: { tip: '正在加载...', spinning: true } });
    WrapFetch.get(
      {
        url: `/api/document/findByPageAndType`,
        queryParam: { type: DocumentType.THINK, page: this.state.pageNum - 1, pageSize: this.state.pageSize }
      }
    ).then(
      (data) => {
        this.setState({ list: data.content, total: data.totalElements, hasMore: data.totalPages > this.state.pageNum, loading: false });
      }
    );
  }
  getMoreData = () => {
    WrapFetch.get(
      {
        url: `/api/document/findByPageAndType`,
        queryParam: { type: DocumentType.THINK, page: this.state.pageNum - 1, pageSize: this.state.pageSize }
      }
    ).then(
      (data) => {
        this.setState({ list: this.state.list.concat(data.content), total: data.totalElements, hasMore: data.totalPages > this.state.pageNum, scrollLoading: false });
      }
    );
  };
  render() {
    let ThinkContents = [];
    this.state.list.forEach((element, index, array) => {
      ThinkContents.push(<ThinkContent element={element} key={index} loading={this.state.loading} />);
    });
    return (
      <div>
        <InfiniteScroll
          className="list-contents"
          initialLoad={false}
          pageStart={0}
          loadMore={this.getMore.bind(this)}
          hasMore={!this.state.scrollLoading && this.state.hasMore}
          useWindow={true}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          {ThinkContents}
          {/* Tip:内部元素不要加高度以及overflow:auto等属性！！！！ */}
          {!this.state.hasMore ? <div className="end-text">所有数据已看完</div> : ""}
        </InfiniteScroll>
      </div>
    );

  }

}
export default ThinkList;