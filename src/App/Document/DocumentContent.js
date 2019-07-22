import React,{Component} from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../CodeBlock';
import { Icon } from 'antd';
import './ArticleContent.css';
import headPtoto from './../resource/head_photo.png';

class ArticleContent extends Component{


    render(){
        return (
            <div className="articleContent">
                <div className="headPhoto"><img src={headPtoto }/></div>
                <div className="content">
                    <div className="header">
                        <div className="name">{this.props.element.id}</div>
                        <div className="time">{this.props.element.ts}</div>
                    </div>
                    <ReactMarkdown className="markdown" source={this.props.element.content}  escapeHtml={false} renderers={{ code: CodeBlock }}/>
                </div>
                <div className="handle">
                    <div className="comment"><Icon type="message" />  评论</div>
                    <div className="like"><Icon type="heart" />  点赞</div>
                </div>
            </div>
        );
    }
}
export default ArticleContent;