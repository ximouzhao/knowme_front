import React, { Component } from 'react';
import './MessageBoard.css';
import { Input , Modal,Upload, message, Button, Icon,Alert ,Spin} from 'antd';
import MessageList from './MessageList';
import DocumentType from  '../../Constant/DocumentType';
import SparkMD5 from 'spark-md5';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class MessageBoard extends Component {

  //state状态 value值得是
  state ={
    txtValue:'',
    list:[],
    loading: false,
    tip:'',
    fileList: [],
    uploading: false,
    previewVisible: false,
    previewImage: '',
    picAddDisabled:false,
    btnPublishDisabled:true,
    modelVisible:false,
  };
  onRemove=(file)=>{
    this.setState(state => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  }
  isEmpty=(str)=>{
    if(str!= undefined&&str!=null && str.length!=0){
      return false;
    }else{
      return true;
    }
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    console.log(file);
    //这里也是包装后的File类型，file.originFileObj是原生类型
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  handleChange = ({ fileList }) =>{
    //这里的fileList是对File进行包装之后的类型，file.originFileObj是原生类型
    if(fileList.length>=9){
      this.setState({ fileList:fileList,picAddDisabled:true });
    }else{
      this.setState({ fileList:fileList,picAddDisabled:false });
    }
    if(this.isEmpty(fileList)&&this.isEmpty(this.state.txtValue)){
      this.setState({btnPublishDisabled:true});
    }else{
      this.setState({btnPublishDisabled:false});
    }
  } 
  beforeUpload=(file)=>{
    //这里的fileList是原生File类型
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('文件类型必须是 JPG或者PNG !');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error('图像大小必须小于10MB!');
    }
    let filename=file.name;
    let markdownUseFileName=filename;
    //markdwown需要转义一些字符
    let parseArr={
      "\\\\":"\\","\\\`":"\`",
      "\\\*":"\*","\\\_":"\_",
      "\\\{":"\{","\\\}":"\}",
      "\\\[":"\[","\\\]":"\]",
      "\\\(":"\(","\\\)":"\)",
      "\\\#":"\#","\\\+":"\+",
      "\\\-":"\-","\\\!":"\!"
    };
    for(let key in parseArr){
      let reg=new RegExp(key,"g");
      markdownUseFileName=markdownUseFileName.replace(reg,"\\"+parseArr[key]);
    }
    file.markdownUseFileName=markdownUseFileName;
    let fileList=this.state.fileList;
    if (!file.url ){
      let spark = new SparkMD5();
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function(e){
        file.fileMd5=SparkMD5.hashBinary(e.target.result);
      }
    }

    return false;
  }
  handleUpload = async (fileList) => {
    const formData = new FormData();
    //formData.append('file', fileList[0].originFileObj);
    fileList.forEach(file => {
      formData.append('files', file.originFileObj);
    });

    this.setState({
      uploading: true,
    });
    await fetch('/api/file/upload', {
      method: 'post',
      body: formData,
      }).then(response => response.json())
      .then((data) => {
        this.setState({
          fileList: [],
          uploading: false,
          btnPublishDisabled:true,
        });
        //message.success('图片上传成功');
        return "success";
      }).catch((err)=>{
        this.setState({
          uploading: false,
        });
       // message.error('上传图片失败');
        return "fail";
      });
  };
  saveDocument=async (fileList,txtValue)=>{
    console.log(DocumentType.MESSAGE);
    let markdownPic='';
    fileList.forEach(file => {
        markdownPic+="\n![" + file.markdownUseFileName + "](/api/files/" + file.originFileObj.fileMd5+file.name.substr(file.name.lastIndexOf('.')) + ")";
      });
    txtValue+=markdownPic;
    let url=`/api/document/addDocument?type=${DocumentType.MESSAGE}&`+this.changeJSON2QueryString({content:txtValue});
    await fetch(url).then(res=>{
      //message.success('成功发表留言');
      this.setState({txtValue:''});
    })
    
  };
  publishMessage=async ()=>{
    this.setState({btnPublishDisabled:true});
    const { fileList ,txtValue} = this.state;
    this.setState({loading:true,tip:'正在上传图片...'})
    await this.handleUpload(fileList);
    this.setState({tip:'正在保存留言...'})
    await this.saveDocument(fileList,txtValue);
    this.setState({tip:'正在重新加载...'})
    await this.getListData();
    this.setState({loading:false})
  }
  showModal =() => {
    this.setState({
      modelVisible: true,
    });
  };
  closeModal = () => {
    this.setState({
      modelVisible: false,
    });
  };


  changeJSON2QueryString(JSON){
    var temp = [];
    for(var k in JSON){
        temp.push(k + "=" + encodeURIComponent(JSON[k]));
    }
    return temp.join("&");
  }
  hanldleTextAreaChange=(event)=>{
    if(event && event.target){
      let txtValue=event.target.value;
      this.setState(()=>({txtValue:txtValue}));
    }
    console.log(this.fileList);
    console.log(this.state.txtValue);
    if(this.isEmpty(this.fileList)&&this.isEmpty(event.target.value)){
      this.setState({btnPublishDisabled:true});
    }else{
      this.setState({btnPublishDisabled:false});
    }
  };
  handleSaveButtonClick=(event)=>{
    console.log('button click');
    if(event && event.target ){
      this.publishMessage();
    }
  };
 
  async componentDidMount(){
      this.setState({loading:true,tip:'正在加载留言...'})
      await this.getListData();
      this.setState({loading:false});

  };
  getListData= async ()=>{
  await fetch(`/api/document/findByType?type=${DocumentType.MESSAGE}`).then(response=>{
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

    const uploadButton = (
      <div>
        <Icon type={'plus'} />
        <div className="ant-upload-text">添加图片</div>
      </div>
    );
    const tip = (
      <div>
        <Alert message="最多添加9张图片" type="info" />
      </div>
    );
    const { imageUrl } = this.state;
    const { previewVisible, previewImage, fileList,picAddDisabled, btnPublishDisabled} = this.state;
    return (
      <Spin spinning={this.state.loading} tip={this.state.tip}>
          <div className="messageBoard">
            <div className="editArea">
                <TextArea value={this.state.txtValue} rows={4} onChange={event=>this.hanldleTextAreaChange(event)} />
                  <div style={{marginTop:'10px'}}>
                    <Button disabled={btnPublishDisabled} type="primary" style={{float:'right',marginRight:'20px'}} onClick={event=>this.handleSaveButtonClick(event)}>发表</Button>
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                      beforeUpload={this.beforeUpload}
                      disabled={picAddDisabled}
                      accept="image/jpeg,image/png,image/jpg"
                      >
                    { uploadButton}
				            </Upload>
                    {fileList.length >=9 ?  tip: null}
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} width={'80%'}>
                      <img alt="预览" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
            </div>
                <MessageList list={this.state.list}/>
          <Modal
            visible={this.state.modelVisible}
            title="Title"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            closable={false}
            keyboard={false}
            centered={true}
          >
          </Modal>
        </div>
     </Spin>
    );
  }
}

export default MessageBoard;
