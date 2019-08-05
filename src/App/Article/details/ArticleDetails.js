import React, { Component } from 'react';
import Article from '../ArticleList';
import WrapFetch from '../../../Tools/WrapFetch';
import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../../Tools/CodeBlock';

class ArticleDetail extends Component{
    state = {
        loading: true,
        data:{}
      };
    componentDidMount(){
        console.log(this.props);
        let patharr=this.props.location.pathname.split('/');
        let id=patharr[patharr.length-1];
        console.log(id);
        WrapFetch.get(`/api/document/findById?id=${id}`,
            (data)=>{
                this.setState({loading:false,data:data});
            }
        );
    };
    render(){
        return (<div>
            <Card style={{ marginTop: 16,overflow:'hidden'}}>
                <Skeleton active loading={this.state.loading} style={{height:'800px'}} title={{width:330}} paragraph={{rows:22,width:220}}>
                    <div>
                        <h1>{this.state.data.name}</h1>
                        <h4 style={{color:"rgb(158, 171, 179)"}}>{this.state.data.ts}</h4>
                        <p>
                        <ReactMarkdown className="markdown" 
                            source={this.state.data.content} 
                            escapeHtml={false} 
                            renderers={{ code: CodeBlock }}/>
                        </p>
                    </div>
                </Skeleton>
            </Card>
        </div>);
    }
}
export default ArticleDetail;