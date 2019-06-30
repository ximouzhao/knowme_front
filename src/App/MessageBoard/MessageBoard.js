import React, { Component } from 'react';
import './MessageBoard.css';
import { Input } from 'antd';
import MessageList from './MessageList';
import {
  Upload, message, Button, Icon,
} from 'antd';

class MessageBoard extends Component {

  //文件上传组件
  uploadProps = {
    accept: '.png, .jpg, .jpeg',
    name: 'file',
    action: '/api/file/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange:(info)=> {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  uploadMp3Props = {
    accept: '.mp3',
    name: 'file',
    action: '/api/file/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange:(info)=> {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        this.getListData();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  //state状态 value值得是
  state ={txtValue:'',list:[]};
  
  saveArticle=(txtValue)=>{
    let url='/api/article/add_article?'+this.changeJSON2QueryString({content:txtValue});
    fetch(url).then(res=>{
      message.success('成功发表留言');
      this.setState({txtValue:''});
      this.getListData();
    })
  };
  changeJSON2QueryString(JSON){
    var temp = [];
    for(var k in JSON){
        temp.push(k + "=" + encodeURIComponent(JSON[k]));
    }
    return temp.join("&");
  }
  hanldleTextAreaChange=(event)=>{
    if(event && event.target && event.target.value){
      let txtValue=event.target.value;
      console.log(txtValue);
      this.setState(()=>({txtValue:txtValue}));
    }
  };
  handleSaveButtonClick=(event)=>{
    console.log('button click');
    if(event && event.target ){
      this.saveArticle(this.state.txtValue);
    }
  };
componentDidMount(){
    this.getListData();

};
getListData=()=>{
    fetch('/api/article/list').then(response=>{
      if(response.ok){
          return response.json();
      }else{
          message.error(response.statusText);
      }
  }).then(result=>{
        try{
          if(result.data){ 
            this.setState({list:result.data});
          }
        }catch(err){
          console.log(err);
        }
    })
  };
  render() {
    const { TextArea } = Input;
    console.log(this.uploadProps);
    return (
          <div className="messageBoard">
            <div className="editArea">
                <TextArea value={this.state.txtValue} rows={4} onChange={event=>this.hanldleTextAreaChange(event)} />
                <Upload {...this.uploadProps}>
                <Button>
                    <Icon type="picture" /> 上传图片
                </Button>
                </Upload>
                <Button type="primary" onClick={event=>this.handleSaveButtonClick(event)}>发表</Button>
                </div>
                <MessageList list={this.state.list}/>
        </div>
    );
  }
}

export default MessageBoard;
