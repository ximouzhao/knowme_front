import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../Tools/CodeBlock';

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
                    <h3>{this.props.element.name}</h3>
                    <p>
                    <ReactMarkdown className="markdown" 
                        source={this.props.element.content.substring(0, 200)} 
                        escapeHtml={false} 
                        renderers={{ code: CodeBlock }}/>
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