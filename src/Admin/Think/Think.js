import React, { Component } from 'react';
import { Table, Divider, Tag ,Popconfirm} from 'antd';
import DocumentType from  '../../Constant/DocumentType';
import { message} from 'antd';
import WrapFetch from '../../Tools/WrapFetch';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../Tools/CodeBlock';
  
class Think extends Component{
    
  componentDidMount(){
    this.onPageChange(1,10);
  };
  state={list:[],loading:true, page: 1, pageSize: 10, total: 0 };
  onPageChange = (page, pageSize) => {
    this.setState({ loading: { tip: '正在加载...', spinning: true } });
    WrapFetch.get(
      {
        url: `/api/document/findByPageAndType`,
        queryParam: { type: DocumentType.THINK,page: page-1, pageSize: pageSize }
      }
    ).then(
      (data) => {
        this.setState({ loading: false, list: data.content, total: data.totalElements, page: data.number+1, pageSize: data.size });
      }
    );
  }

    render(){
      let columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '内容',
          dataIndex: 'content',
          key: 'content',
          render: (text, record) => {
            
            return (
              <ReactMarkdown className="markdown" source={text}  escapeHtml={false} renderers={{ code: CodeBlock }}/>
            )
          },
          width: 1000,
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
              WrapFetch.get(`/api/document/deleteById?id=${record.id}`,
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
        <div><Table columns={columns} dataSource={this.state.list} rowKey="id" loading={this.state.loading} 
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
          }
        /></div>);
    };
}

export default Think;