import React, { Component } from 'react';
import './App.css';
import { BackTop,Layout,Icon,Row, Col} from 'antd';
import MainLeftMenu from './Menu/MainLeftMenu';
import MessageBoard from './MessageBoard/MessageBoard';
//import Header from './Header/Header';
import { BrowserRouter,Route,withRouter } from 'react-router-dom';
import Home from './Home/Home';
import ArticleList from './Article/ArticleList';
import ArticleDetails from './Article/details/ArticleDetails';
import ThinkList from './Think/ThinkList';
import logopng from '../resource/logo.486a892c.png';

const {Header,Content,Footer,Sider} =Layout;
const minMarginLeft=0;
const maxMarginLeft=200;
class App extends Component {

  state={
    collapsed:false,
    rightLayoutStyle:{},
    padding:"",
    appContentMaskClassName:"appContentMask",
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
      let isPhone=window.innerWidth<=768;
      let collapsed=!this.state.collapsed;
      let animation=( collapsed)?'rightAreaCollapsed 0.2s':'rightAreaUnCollapsed 0.2s' ;
      if(isPhone){
        if(collapsed){
          this.setState({
            collapsed: collapsed,
            appContentMaskClassName:"appContentMask",
          });
        }else{
          this.setState({
            collapsed: collapsed,
            appContentMaskClassName:"appContentMask appContentMaskOpen",
          });
        }
      }else{
        let marginLeft=( collapsed)?minMarginLeft:maxMarginLeft ;
        this.setState({
            collapsed: collapsed,
            rightLayoutStyle:{animation:animation,marginLeft:marginLeft,animationTimingTunction:'linear'},
            appContentMaskClassName:"appContentMask",
        });
      }
  };
  render() {
    return (
      <Layout style={{minHeight:'100vh'}}>
        <BackTop stype={{color:'#ff4d4f'}}/>
        <Header style={{background:'#ff4d4f',padding:0,position: 'fixed', width: '100%' ,boxShadow:'0 2px 8px rgba(255, 77, 79,0.45)',zIndex: 7}}>
          <Icon
                className="appTrigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                />
          <div className="logoDiv">
                <img className="logoPic" src={logopng}/>
          </div>
        </Header>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} 
                    breakpoint="lg" onBreakpoint={this.onCollapse} collapsedWidth={minMarginLeft}
                    className='appSider'
                >
          <MainLeftMenu/>
        </Sider>
        <Layout style={this.state.rightLayoutStyle} >
              <div className={this.state.appContentMaskClassName} onClick={this.toggle}></div>
              <Content className="layoutContent" >
                <Route exact path={`${this.props.match.path}`} component={Home}/>
                <Route exact path={`${this.props.match.path}/home`} component={Home}/>
                <Route exact path={`${this.props.match.path}/article`} component={ArticleList}/>
                <Route path={`${this.props.match.path}/article/details`} component={ArticleDetails}/>
                <Route exact path={`${this.props.match.path}/think`} component={ThinkList}/>
                <Route exact path={`${this.props.match.path}/messageBoard`} component={MessageBoard}/>
              </Content>
              <Footer style={{textAlign:'center'}}>Ximou Zhao ©2019 Created by Ximou Zhao</Footer>
        </Layout>
    </Layout>
    );
  }
}

export default withRouter(App);
