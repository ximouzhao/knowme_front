import React, { Component } from 'react';
import {  Row, Col, Input, Button, Icon,Card,message } from 'antd';
import DocumentType from  '../../Constant/DocumentType';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../Tools/CodeBlock';
import WrapFetch from '../../Tools/WrapFetch';

const { TextArea } = Input;
class NewArticle extends Component{
    state={textValue:""};
    onChange=(e)=>{
        this.setState({textValue:e.target.value});
    }
    changeJSON2QueryString(JSON){
        var temp = [];
        for(var k in JSON){
            temp.push(k + "=" + encodeURIComponent(JSON[k]));
        }
        return temp.join("&");
      }
    onNewArtilcButtonClick=()=>{
        let url=`/api/document/add_document?type=${DocumentType.ARTICLE}&`+this.changeJSON2QueryString({content:this.state.textValue});
        fetch(url).then(res=>{
          message.success('成功发表文章');
          //this.setState({txtValue:''});
        })
    }
    render(){
        return (
            <div>
                <Row >
                    <Col span={12} >
                        <Button type="primary" onClick={this.onNewArtilcButtonClick}>
                        发表
                        </Button>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px",marginBottom:"20px"}}>
                    <Col span={24}><Input placeholder="标题" /></Col>
                </Row>
                <Row gutter={16} style={{height:'100%'}}>
                    <Col span={12} >
                        <TextArea size={'large'} onChange={this.onChange} autosize={{ minRows: 50}}/>
                    </Col>
                    <Col span={12}>
                        <Card style={{minHeight:'1060px'}}>
                            <ReactMarkdown className="markdown" source={this.state.textValue}  escapeHtml={false} renderers={{ code: CodeBlock }}/>
                        </Card>
                    </Col>
                </Row>
            </div>
            );
    }
}

export default NewArticle;