import React, { Component } from 'react';
import { BrowserRouter,Route,Link,withRouter } from 'react-router-dom';
import {Layout,Menu,Breadcrumb,Icon,BackTop} from 'antd';
import VisitorLog from './VisitorLog/VisitorLog';
import Home from './Home/Home';
import './Admin.css';
import Think from './Think/Think';
import Article from './Article/Article';
import MessageBoard from './MessageBoard/MessageBoard';

const {Header,Content,Footer,Sider} =Layout;
const {SubMenu} =Menu;
const breadcrumbNameMap = {
    'home': '主页',
    'think': '随想管理',
    'article': '文章管理',
    'message':'留言管理',
    'visitor_log': '访问日志',
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
        const { location } = this.props;
        console.log(this.props);
        const pathSnippets = location.pathname.replace('/admin','').split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((value, index) => {
          const url = `/admin/${pathSnippets.slice(0, index + 1).join('/')}`;
          return (
            <Breadcrumb.Item key={value}>
              <Link to={url}>{breadcrumbNameMap[value]}</Link>
            </Breadcrumb.Item>
          );
        });
        return extraBreadcrumbItems;
      };
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
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Link to={`${this.props.match.path}/home`}>
                            <span>
                                <Icon type="home" />
                                <span>主   页</span>
                            </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={`${this.props.match.path}/think`}>
                            <span>
                                <Icon type="bulb" /><span>随想管理</span>
                            </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={`${this.props.match.path}/article`}>
                            <span>
                                <Icon type="read" /><span>文章管理</span>
                            </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to={`${this.props.match.path}/message`}>
                            <span>
                                <Icon type="message" /><span>留言管理</span>
                            </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to={`${this.props.match.path}/visitor_log`}>
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
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Route exact path={`${this.props.match.path}/`} component={Home}/>
                            <Route path={`${this.props.match.path}/home`} component={Home} />
                            <Route path={`${this.props.match.path}/think`} component={Think}/>
                            <Route path={`${this.props.match.path}/article`} component={Article}/>
                            <Route path={`${this.props.match.path}/message`} component={MessageBoard}/>
                            <Route path={`${this.props.match.path}/visitor_log`} component={VisitorLog}/>
                        </div>
                    </Content>
                    <Footer style={{textAlign:'center'}}>Ximou Zhao ©2019 Created by Ximou Zhao</Footer>
                </Layout> 
            </Layout>
        );
    }
}
export default withRouter(Admin);



