import React,{Component} from 'react';
import Table from 'antd/lib/table';
import './VisitorLog.css';
import { message} from 'antd';
import WrapFetch from '../../Tools/WrapFetch';
class VisitorLogList extends Component{
    componentDidMount(){
        this.getListData();
    };
    state={list:[],loading:true};
    getListData=()=>{
        this.setState({loading:{tip:'正在加载...',spinning:true}});
        WrapFetch.get(`/api/visitor_log/list`,
            (data)=>{
                this.setState({loading:false,list:data});
            }
        );
    };
    
    render(){
        const columns = [
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
              width: 180,
            },
            {
                title: 'IP信息',
                dataIndex: 'clientIpInfo',
                key: 'clientIpInfo.city',
              },
          ];

        // let visitor_log_list=[];
        // this.state.list.forEach((element,index,array )=> {
        //     visitor_log_list.push(<div key={index}>{JSON.stringify(element)}</div>)
        // });
        return <div className="VisitorLogList"><Table dataSource={this.state.list} columns={columns} rowKey="id" loading={this.state.loading}/></div>;
    }
}

export default VisitorLogList;