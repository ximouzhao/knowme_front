import 'react-app-polyfill/ie9';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './index.css';
import { BrowserRouter,Route,Link,withRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import {Layout,Menu,Breadcrumb,Icon,BackTop} from 'antd';
import VisitorLog from './VisitorLog/VisitorLog';
import Home from './Home/Home';
import Think from './Think/Think';
import Article from './Article/Article';
import MessageBoard from './MessageBoard/MessageBoard';
import NewArticle from './Article/NewArticle';



const {Header,Content,Footer,Sider} =Layout;
const breadcrumbNameMap = {
    'home': '主页',
    'think': '随想管理',
    'article': '文章管理',
    'message':'留言管理',
    'visitorLog': '访问日志',
    'newArticle':'写文章'
  };
const minMarginLeft=0;
const maxMarginLeft=200;
class Admin extends Component{
    minMarginLeft=0;
    maxMarginLeft=200;
    state={
        collapsed:false,
        rightLayoutStyle:{},
    };
    onCollapse = collapsed => {
        console.log(collapsed);
        let animation=( collapsed)?'rightAreaCollapsed 0.2s':'rightAreaUnCollapsed 0.2s' ;
        let marginLeft=( collapsed)?minMarginLeft:maxMarginLeft ;
        console.log(animation);
        this.setState({ 
            collapsed,
            rightLayoutStyle:{marginLeft:marginLeft}
        });
      };
    toggle = () => {
        let collapsed=!this.state.collapsed;
        let animation=( collapsed)?'rightAreaCollapsed 0.2s':'rightAreaUnCollapsed 0.2s' ;
        let marginLeft=( collapsed)?minMarginLeft:maxMarginLeft ;
        this.setState({
            collapsed: collapsed,
            rightLayoutStyle:{animation:animation,marginLeft:marginLeft,animationTimingTunction:'linear'}
        });
    };
    generatorBreadcrumbItems(){
        const pathSnippets = window.location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((value, index) => {
          const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
          return (
            <Breadcrumb.Item key={value}>
              <Link to={url}>{breadcrumbNameMap[value]}</Link>
            </Breadcrumb.Item>
          );
        });
        return extraBreadcrumbItems;
      };
    getdefaultSelectedKeys(){
        const pathSnippets = window.location.pathname.split('/').filter(i => i);
        return pathSnippets;
    }
    render (){
        return (
            <Layout style={{minHeight:'100vh'}}>
                <BackTop />
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} 
                    breakpoint="lg" onBreakpoint={this.onCollapse} collapsedWidth={minMarginLeft}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        zIndex:2,
                      }}
                >
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={this.getdefaultSelectedKeys()} mode="inline">
                        <Menu.Item key="home">
                            <Link to={`/home`}>
                            <span>
                                <Icon type="home" />
                                <span>主   页</span>
                            </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="think">
                            <Link to={`/think`}>
                            <span>
                                <Icon type="bulb" /><span>随想管理</span>
                            </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="article">
                            <Link to={`/article`}>
                            <span>
                                <Icon type="read" /><span>文章管理</span>
                            </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="message">
                            <Link to={`/message`}>
                            <span>
                                <Icon type="message" /><span>留言管理</span>
                            </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="visitorLog">
                            <Link to={`/visitorLog`}>
                            <span>
                                <Icon type="file-text" /><span>访问日志</span>
                            </span>
                            </Link>
                        </Menu.Item>
                </Menu>
                </Sider>
                <Layout style={this.state.rightLayoutStyle} >
                    <Header style={{background:'#fff',padding:0,position: 'fixed', zIndex: 1, width: '100%' }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                            />
                        
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <Breadcrumb style={{margin:'16px 0'}} >
                            {this.generatorBreadcrumbItems()}
                        </Breadcrumb>   
                        <div style={{ padding: 24, background: '#fff', height: '100%' }}>
                                <Route exact path={`/`} component={Home}/>
                                <Route exact path={`/home`} component={Home} />
                                <Route exact path={`/think`} component={Think}/>
                                <Route exact path={`/article`} component={Article}/>
                                <Route exact path={`/article/newArticle`} component={NewArticle}/>
                                <Route exact path={`/message`} component={MessageBoard}/>
                                <Route exact path={`/visitorLog`} component={VisitorLog}/>
                        </div>
                    </Content>
                    <Footer style={{textAlign:'center'}}>Ximou Zhao ©2019 Created by Ximou Zhao</Footer>
                </Layout> 
            </Layout>
            
        );
    }
}
export default Admin;

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <BrowserRouter >
            <Admin/>
        </BrowserRouter>
    </ConfigProvider>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
