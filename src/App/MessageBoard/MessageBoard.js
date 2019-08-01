import React, { Component } from 'react';
import './MessageBoard.css';
import { Input } from 'antd';
import MessageList from './MessageList';
import DocumentType from  '../../Constant/DocumentType';
import {
  Upload, message, Button, Icon,
} from 'antd';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('文件类型必须是 JPG或者PNG !');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('图像大小必须小于10MB!');
  }
  return isJpgOrPng && isLt2M;
}
class MessageBoard extends Component {

  //state状态 value值得是
  state ={txtValue:'',list:[],loading: false,};
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  
  saveDocument=(txtValue)=>{
    console.log(DocumentType.MESSAGE);
    let url=`/api/document/add_document?type=${DocumentType.ARTICLE}&`+this.changeJSON2QueryString({content:txtValue});
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
    
  };
componentDidMount(){
    this.getListData();

};
getListData=()=>{
    fetch(`/api/document/findbytype?type=${DocumentType.MESSAGE}`).then(response=>{
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

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">添加图片</div>
      </div>
    );
    const { imageUrl } = this.state;

    return (
          <div className="messageBoard">
            <div className="editArea">
                <TextArea value={this.state.txtValue} rows={4} onChange={event=>this.hanldleTextAreaChange(event)} />
                  <div style={{marginTop:'10px'}}>
                    <Button type="primary" style={{float:'right',marginRight:'20px'}} onClick={event=>this.handleSaveButtonClick(event)}>发表</Button>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="/api/file/upload"
                      beforeUpload={beforeUpload}
                      onChange={this.handleChange}
                    >
                      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                  </div>
                  
                
            </div>
                <MessageList list={this.state.list}/>
        </div>
    );
  }
}

export default MessageBoard;
