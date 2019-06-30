import React,{Component} from 'react';
import { Input } from 'antd';
import './Header.css';
import logopng from '../../resource/logo.png';

const { Search } = Input;


class Header extends Component{
    render(){
        return (<div>
          <Search className="search" placeholder="输入你要搜索的内容" onSearch={value => console.log(value)} />
          </div>);
    }

}

export default Header;