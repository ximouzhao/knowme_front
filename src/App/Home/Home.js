import React, { Component } from 'react';
import './Home.css';
import { Timeline, Icon,Card,List ,Descriptions,Typography } from 'antd';
import world_pic from '../../resource/world.jpg';

const { Text,Title,Paragraph } = Typography;
const data = [
    {
      title: '随想',
      description: 
        <div style={{display:'inline'}}>
            <span>：当浏览网页查找资料的时候，通过自己编写的插件，将网址和title保存到这里，方便之后查找，搜索，将各种随便化的信息集中起来，类似于软件
                <a href="https://getpocket.com/">Pocket</a>的功能
            </span>
        </div>
          
    },
    {
      title: '文章',
      description: '：会不时总结自己认为有价值的问题。'
    },
    {
        title: 'Github',
        description: '：欢迎一次合作完成项目，或对项目提出建议'
      },
    {
    title: '微博',
    description: '：欢迎互粉,点赞，评论，@'
    },
    {
      title: '留言',
      description: '：有什么话想说都可以写在这里'
    }
  ];
class Home extends Component{
    render(){
        return (
            <div>
                <Card style={{ marginTop: 16 }} >
                    <h2 style={{textAlign:'center'}}><span style={{color:'rgba(242, 38, 19, 1)',fontWeight:'bold'}}>欢迎来到我的个人网站</span></h2>
                    <Descriptions style={{color:'rgba(0, 181, 204, 1)'}} title="个人信息" layout="horizontal">
                    <Descriptions.Item label="个人状态"> <span style={{color:'rgba(46, 204, 113, 1)'}}>求职中...</span></Descriptions.Item>
                    <Descriptions.Item label="毕业院校">西北农林科技大学 16年毕业 (985院校)</Descriptions.Item>
                    <Descriptions.Item label="现居住地">陕西 西安 高新区</Descriptions.Item>
                    <Descriptions.Item label="邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱">ximouzhao@foxmail.com</Descriptions.Item>
                    <Descriptions.Item label="爱&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;好">
                    各种球类运动，打游戏，写代码，探讨人生...
                    </Descriptions.Item>
                </Descriptions>
                </Card>
                <Card style={{marginTop:'20px'}}>
                    <h3 className='homeH3'>本站相关技术：</h3>
                    <Paragraph>本站技术栈：React + antd + springboot + mysql
                    </Paragraph><Paragraph>
                        前台代码同步Github：<a href="https://github.com/ximouzhao/knowme_front">knowme_front</a>
                    </Paragraph><Paragraph>
                        后台代码同步Github：<a href="https://github.com/ximouzhao/knowme_background">knowme_background</a>
                    </Paragraph><Paragraph>
                        全部使用markdown语法来进行文章的编写，包括留言,致谢<a href="http://rexxars.github.io/react-markdown/">react-markdown</a>项目
                    </Paragraph>
                        
                    <h3 className='homeH3'>功能介绍：</h3>
                    <List
                        size="large"
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <div>
                                 <Paragraph>
                                    <Text mark>{item.title}</Text>
                                    <Text >{item.description}</Text>
                                </Paragraph>
                            </div>
                        )}
                    />
                </Card>
                <Card style={{marginTop:'20px'}}>
                    <div style={{textAlign:'center'}}><h1 style={{color:'rgba(242, 38, 19, 1)',fontWeight:'bold'}}>开发进度：</h1></div>
                    <Timeline mode="alternate" style={{marginTop:'20px'}}>
                        <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                            待办事项：
                            <br/>1.登录管理，需要支持Github登录
                            <br/>2.前台搜索功能
                            <br/>3.文章支持锚点
                            <br/>4.显示文章阅读数
                            <br/>5.点赞评论功能
                        </Timeline.Item>
                        <Timeline.Item>优化在移动端设备显示</Timeline.Item>
                        <Timeline.Item color="green">实现后台新增文章的功能</Timeline.Item>
                        <Timeline.Item color="blue">
                        确定前台页面，增加后台管理页面
                        </Timeline.Item>
                        <Timeline.Item color="red">编写前台页面</Timeline.Item>
                        <Timeline.Item>实现图片上传</Timeline.Item>
                        <Timeline.Item >
                            熟悉Ant Design 搭建前后台工程
                        </Timeline.Item>
                    </Timeline>
            </Card>
          </div>
        );
    }
}

export default Home;