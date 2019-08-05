import React,{Component} from 'react'
import { Menu, Icon ,Layout} from 'antd';
import { BrowserRouter,Route,Link } from 'react-router-dom';
import './MainLeftMenu.css';

const { SubMenu } = Menu;
class MainLeftMenu extends Component{
    // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
    render(){
        return (
          <Layout style={{background:'#fff' }}>
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
              >
              <Menu.Item key="1">
                    <Link to="/app/home">
                      <span>
                        <Icon type="home" />主页
                      </span>
                    </Link>
                    
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/app/think">
                <span>
                      <Icon type="bulb" />
                      <span>随想</span>
                    </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                  <Link to="/app/article">
                    <span>
                      <Icon type="read" />
                      <span>文章</span>
                    </span>
                  </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <a href="https://github.com/ximouzhao" target="_blank" rel="noopener noreferrer">
                    <span>
                      <Icon type="github" />
                      <span>Github</span>
                    </span>
                </a>
              </Menu.Item>
              <Menu.Item key="5">
                  <a href="https://www.weibo.com/ximouzhao" target="_blank" rel="noopener noreferrer">
                        <span>
                                <Icon type="weibo" />
                                <span>Weibo</span>
                        </span>
                  </a>
              </Menu.Item>
              <Menu.Item key="6">
                  <Link to="/app/messageBoard">
                    <span><Icon type="message" />留言</span>
                  </Link>
                    
              </Menu.Item>
              </Menu>
          </Layout>);
    }
}
export default MainLeftMenu;