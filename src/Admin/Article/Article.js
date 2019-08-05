import React, { Component } from 'react';
import { Table, Divider, Tag ,Popconfirm, Form, Row, Col, Input, Button, Icon } from 'antd';
import DocumentType from  '../../Constant/DocumentType';
import { message} from 'antd';
import WrapFetch from '../../Tools/WrapFetch';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../Tools/CodeBlock';
import WrappedAdvancedSearchForm from './WrappedAdvancedSearchForm';
  
class Article extends Component{
    
  state={list:[],loading:true};
  
  componentDidMount(){
    this.getListData();
  };
  getListData=()=>{
      this.setState({loading:{tip:'正在加载...',spinning:true}});
      WrapFetch.get(`/api/document/findbytype?type=${DocumentType.ARTICLE}`,
        (data)=>{
          this.setState({loading:false,list:data});
        }
      );
      
  };
    render(){
      let columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '标题',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
          render: (text, record) => {
            return (
              <div>
                <ReactMarkdown className="markdown" source={text.substring(0, 20)}  escapeHtml={false} renderers={{ code: CodeBlock }}/>
              </div>
              
            )
          },
        },
        {
          title: '时间戳',
          dataIndex: 'ts',
          key: 'ts',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: tags =>{
            if(!tags){
              tags=['tags1','tags2'];
            }
            return (
              <span>
                {
                  
                  tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                      color = 'volcano';
                    };
                    return (
                      <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                      </Tag>
                    );
                  })
                }
              </span>
            )
          } 
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => {
            let handleUpdate = (e)=>  {
              e.preventDefault();
              console.log(record);
              // WrapFetch.get(`/api/document/updateById?id=${record.id}`,
              //   (data)=>{
              //     this.setState({loading:false,list:data});
              //   }
              // );
            };
            let handleDelete = (e)=>  {
              e.preventDefault();
              console.log(record);
              this.setState({loading:{tip:'正在删除...',spinning:true}});
              WrapFetch.get(`/api/document/deletebyid?id=${record.id}`,
                (data)=>{
                  this.getListData();
                }
              );
            };
            return (
              <span>
                <a href="javascript:" onClick={handleUpdate}>修改</a>
                <Divider type="vertical" />
                <Popconfirm
                  placement="topRight"
                  title="确认删除此条数据？"
                  onConfirm={handleDelete}
                  okText="是"
                  cancelText="否"
                >
                  <a href="javascript:;" >删除</a>
                </Popconfirm>
              </span>
            )
          },
        },
      ];
        return (
          <div>
            <WrappedAdvancedSearchForm history={this.props.history}/>
            <Table style={{marginTop:20}} columns={columns} dataSource={this.state.list} rowKey="id" loading={this.state.loading}/>
          </div>);
    };
}

export default Article;