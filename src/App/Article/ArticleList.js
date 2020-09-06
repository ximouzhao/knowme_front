import React, { Component } from 'react';
import WrapFetch from '../../Tools/WrapFetch';
import ArticleContent from './ArticleContent';
import DocumentType from '../../Constant/DocumentType';
import { message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';


class Article extends Component {
  state = {
    list: [{ title: '1', content: '1' }, { title: '2', content: '2' }, { title: '3', content: '3' }, { title: '4', content: '4' }],
    loading: true,
    // start 滚动加载
    hasMore: true,
    pageNum: 0,
    pageSize: 20,
    total: 0
    // end
  };
  componentDidMount() {
    this.getFirstData();
  }
  getFirstData = () => {
    this.setState({ loading: { tip: '正在加载...', spinning: true } });
    WrapFetch.get(
      {
        url: `/api/document/findByPageAndType`,
        queryParam: { type: DocumentType.ARTICLE, page: 0, pageSize: this.state.pageSize }
      }
    ).then(
      (data) => {
        this.setState({ loading: false, list: data.content, total: data.totalElements, hasMore: data.totalPages > 1, loading: false });
      }
    );

  };
  onChange = checked => {
    this.setState({ loading: !checked });
  };
  // 获取下一页信息
  getMore = (page) => {
    console.log("getmore",page)
    if (this.state.total === this.state.list.length) {
      return;
    }
    this.setState({
      pageNum: page
    }, () => {
      this.getMoreData(page); //请求数据接口
    });
  }
  getMoreData = (page) => {
    WrapFetch.get(
      {
        url: `/api/document/findByPageAndType`,
        queryParam: { type: DocumentType.ARTICLE, page: page, pageSize: this.state.pageSize }
      }
    ).then(
      (data) => {
        this.setState({ list: this.state.list.concat(data.content), total: data.totalElements, hasMore: data.totalPages > page+1, scrollLoading: false });
      }
    );
  };
  render() {
    console.log(this.props.location)
    let ArticleContents = [];
    this.state.list.forEach((element, index, array) => {
      try {
        ArticleContents.push(<ArticleContent element={element} key={index} loading={this.state.loading} location={this.props.location.pathname} />);
      } catch (err) {
        message.error(err + '');
      }
    });
    return (
      <div>
        <InfiniteScroll
          className="list-contents"
          initialLoad={false}
          pageStart={0}
          loadMore={this.getMore.bind(this)}
          threshold={800}
          hasMore={this.state.hasMore}
          useWindow={true}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          {ArticleContents}
          {/* Tip:内部元素不要加高度以及overflow:auto等属性！！！！ */}
          {!this.state.hasMore ? <div className="end-text">-------- 你已经看完所有的文章啦 --------</div> : ""}
        </InfiniteScroll>
      </div>
    );
  };
}

export default Article;