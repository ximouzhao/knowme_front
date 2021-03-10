import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Admin from './Admin/Admin'
import { BrowserRouter,Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
    <BrowserRouter
        /* basename={optionalString}
        forceRefresh={optionalBool}
        getUserConfirmation={optionalFunc}
        keyLength={optionalNumber} */>
        <Route exact path="/" component={Admin}/>
    </BrowserRouter>
    </ConfigProvider>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
