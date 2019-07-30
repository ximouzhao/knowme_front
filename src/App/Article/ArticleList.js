import React, { Component } from 'react';
import WrapFetch from '../../Tools/WrapFetch';
import ArticleContent from './ArticleContent';
import DocumentType from  '../../Constant/DocumentType';
import { message} from 'antd';


class Article extends Component{
    state={list:[{title:'1',content:'1'},{title:'2',content:'2'},{title:'3',content:'3'},{title:'4',content:'4'}],
    loading:false};
    componentDidMount(){
      this.getListData();
    }
    getListData=()=>{
        this.setState({loading:{tip:'正在加载...',spinning:true}});
        WrapFetch.get(`/api/document/findbytype?type=${DocumentType.ARTICLE}`,
        (data)=>{
            this.setState({loading:false,list:data});
        }
        );
        
    };
    onChange = checked => {
    this.setState({ loading: !checked });
    };
     
    render(){
      let ArticleContents=[];
      this.state.list.forEach((element,index,array)=>{
          try{
              element.content=decodeURIComponent(element.content);
              ArticleContents.push(<ArticleContent element={element}  key={index} loading={this.state.loading}/>);
          }catch(err){
              message.error(err+'');
          }
      });
        return (
          <div>
            {ArticleContents}
          </div>
        );
    };
}

export default  Article;