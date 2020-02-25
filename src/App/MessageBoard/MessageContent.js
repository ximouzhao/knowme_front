import React,{Component} from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../Tools/CodeBlock';
import { Icon } from 'antd';
import './MessageContent.css';
import headPtoto from '../../resource/head_photo.png';
import IconKnowMe from '../../Icon/IconKnowMe';

class MessageContent extends Component{

    // componentDidMount(){
    //     let width=this.refs.messageContent.scrollWidth;
    //     console.log(this.refs.messageContent.scrollWidth);
    //     console.log('width='+width);
    //     let iframe=this.refs.content.children[1].getElementsByTagName("iframe");
    //     if(iframe.length>0){
    //         for(var i=0;i<iframe.length;i++){
    //             console.log(iframe[i]);
    //             iframe[i].style.width=width-120+'px';
    //             iframe[i].style.height=(width-120)*9/16+'px';
    //         }
    //     }
    //     //console.log(findDomNode(this.refs.x1));
    // }
    render(){
        return (
            <div className="messageContent">
                <div className="headPhoto"><img src={headPtoto }/></div>
                <div className="content">
                    <div className="header">
                        <div className="name">{this.props.element.id}</div>
                        <div className="time">{this.props.element.ts}</div>
                    </div>
                    <ReactMarkdown className="markdown" source={this.props.element.content}  escapeHtml={false} renderers={{ code: CodeBlock }}/>
                </div>
                <div className="handle">
                    <div className="comment"><IconKnowMe type="iconcomment" />  评论</div>
                    <div className="like"><Icon type="like" />  点赞</div>
                </div>
            </div>
        );
    }
}
export default MessageContent;