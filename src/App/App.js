import React, { Component } from 'react';
import './App.css';
import { Input ,BackTop} from 'antd';
import MainLeftMenu from './Menu/MainLeftMenu';
import MessageBoard from './MessageBoard/MessageBoard';
import Header from './Header/Header';
import { BrowserRouter,Route,withRouter } from 'react-router-dom';
import Home from './Home/Home';
import ArticleList from './Article/ArticleList';
import ArticleDetails from './Article/details/ArticleDetails';
import ThinkList from './Think/ThinkList';

class App extends Component {
  render() {
    return (
      <div className="background">
        <BackTop stype={{color:'#ff4d4f'}}/>
        <div className="App-header"><Header/></div>
        <div className="main-left"><MainLeftMenu/></div>
        <div className="main-right">
              <Route exact path={`${this.props.match.path}`} component={Home}/>
              <Route exact path={`${this.props.match.path}/home`} component={Home}/>
              <Route exact path={`${this.props.match.path}/article`} component={ArticleList}/>
              <Route path={`${this.props.match.path}/article/details`} component={ArticleDetails}/>
              <Route exact path={`${this.props.match.path}/think`} component={ThinkList}/>
              <Route exact path={`${this.props.match.path}/messageBoard`} component={MessageBoard}/>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
