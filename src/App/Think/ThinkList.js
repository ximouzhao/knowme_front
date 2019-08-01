import React, { Component } from 'react';
import WrapFetch from '../../Tools/WrapFetch';
import ThinkContent from './ThinkContent';
import DocumentType from  '../../Constant/DocumentType';
import { message} from 'antd';

class ThinkList extends Component{
  state={list:[{title:'1',content:'1'},{title:'2',content:'2'},{title:'3',content:'3'},{title:'4',content:'4'}],
  loading:false};
  componentDidMount(){
    this.getListData();
  }
  getListData=()=>{
      this.setState({loading:{tip:'正在加载...',spinning:true}});
      WrapFetch.get(`/api/document/findbytype?type=${DocumentType.THINK}`,
      (data)=>{
          this.setState({loading:false,list:data});
      }
      );
      
  };
    render(){

      let ThinkContents=[];
      this.state.list.forEach((element,index,array)=>{
          try{
              element.content=decodeURIComponent(element.content);
              ThinkContents.push(<ThinkContent element={element}  key={index} loading={this.state.loading}/>);
          }catch(err){
              message.error(err+'');
          }
      });
        return (
          <div>
            {ThinkContents}
          </div>
        );
        
    }

}
export default ThinkList;