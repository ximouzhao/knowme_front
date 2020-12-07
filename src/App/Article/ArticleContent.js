import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../Tools/CodeBlock';
import ImageBlock from '../../Tools/ImageBlock';

const { Meta } = Card;

class ArticleContent extends Component{
    render(){
      console.log(this.props);
        return (
            <div>
            <Card
              style={{ marginTop: 20,marginBottom:20,background:'#fff' }}
            
            >
              <Skeleton loading={this.props.loading}  active>
                <div>
                    <h1 style={{lineHeight:"30px",fontSize:"25px"}}>{this.props.element.name}</h1>
                    <h4 style={{color:"rgb(158, 171, 179)"}}>{this.props.element.ts}</h4>
                    <hr/>
                    <p>
                    <ReactMarkdown className="markdown" 
                        source={this.props.element.content.substring(0, 200)} 
                        escapeHtml={false} 
                        renderers={{ code: CodeBlock,image:ImageBlock }}/>
                        <Link to={this.props.location+`/details/${this.props.element.id}`}>阅读全文</Link>
                    </p>
                </div>
              </Skeleton>
            </Card>
          </div>
        );
    }
}

export default ArticleContent;