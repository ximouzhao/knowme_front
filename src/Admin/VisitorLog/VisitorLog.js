import React,{Component} from 'react';
import Table from 'antd/lib/table';
import './VisitorLog.css';
import { message} from 'antd';
class VisitorLogList extends Component{
    componentDidMount(){
        this.getListData();
    };
    state={list:[]};
    getListData=()=>{
        fetch('/api/visitor_log/list').then(
            response=>{
                if(response.ok){
                    return response.json();
                }else{
                    message.error(response.statusText);
                }
            }
        ).then(json =>{
            try{
                if(!json){
                    return ;
                }
                if(json.code=='0'){
                    this.setState({list:json.data});
                }else{
                    message.error(json.msg);
                }
                
            }catch(err){
                message.error(err.message);
                console.log(err);
            }
        })
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
        return <div className="VisitorLogList"><Table dataSource={this.state.list} columns={columns} rowKey="id" /></div>;
    }
}

export default VisitorLogList;