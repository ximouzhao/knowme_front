import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import VisitorLogList from './visitor_log/VisitorLogList';

class Admin extends Component{
    render (){
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} component={VisitorLogList}/>
                <Route path={`${this.props.match.path}/visitor_log`} component={VisitorLogList}/>
            </div>
        );
    }
}
export default Admin;