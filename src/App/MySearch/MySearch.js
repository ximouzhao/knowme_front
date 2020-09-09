import React, { Component } from 'react';
import moment from 'moment'; 
import { Icon, Card, List, Descriptions, Typography } from 'antd';
import WrapFetch from '../../Tools/WrapFetch';
import SearchResult from './SearchResult';
import { Input } from 'antd';
const { Search } = Input;
class MySearch extends Component {
    state = {
        list: [],
        text: "",
        // start 滚动加载
        hasMore: true,
        pageNum: 0,
        pageSize: 20,
        total: 0
        // end
    };
    onSearchClick = (value) => {
        console.log(value)
        this.setState({ text: value,list: [] },this.getMore)
    };
    getMore=()=> {
        WrapFetch.get(
            {
                url: `/api/document/search`,
                queryParam: { text: this.state.text, page: this.state.pageNum, pageSize: this.state.pageSize }
            }
        ).then(
            (data) => {
                data.content.forEach((item)=>{
                    item.ts=moment(item.ts).format("YYYY-MM-DD HH:mm:ss");
                })
                this.setState({ list: this.state.list.concat(data.content), total: data.totalElements, hasMore: data.totalPages > 1, loading: false });
            }
        );
    }
    render() {
        let SearchResults = [];
        this.state.list.forEach((element, index, array) => {
            SearchResults.push(<SearchResult element={element} key={index} loading={this.state.loading} />);
        });
        return (
            <div>
                <Card>
                    <Search placeholder="" onSearch={value => this.onSearchClick(value)} enterButton />
                </Card>
                {SearchResults}
            </div>
        );
    }
}

export default MySearch;