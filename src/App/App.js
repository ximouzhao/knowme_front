import React, { Component } from 'react';
import './App.css';
import { Input } from 'antd';
import MainLeftMenu from './Menu/MainLeftMenu';
import MessageBoard from './MessageBoard/MessageBoard';
import Header from './Header/Header';
import { BrowserRouter,Route } from 'react-router-dom';
import Home from './Home/Home';

class App extends Component {
  render() {
    return (
      <div className="background">
        <div className="App-header"><Header/></div>
        <div className="main-left"><MainLeftMenu/></div>
        <div className="main-right">
              <Route exact path={`${this.props.match.path}`} component={Home}/>
              <Route path={`${this.props.match.path}/home`} component={Home}/>
              <Route path={`${this.props.match.path}/messageBoard`} component={MessageBoard}/>
        </div>
      </div>
    );
  }
}

export default App;
