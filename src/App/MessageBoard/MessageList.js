import React,{Component} from 'react';
import MessageContent from './MessageContent'
import { message} from 'antd';
import './MessageList.css';

class MessageList extends Component{
    
    
    render(){
        let messageContents=[];
        this.props.list.forEach((element,index,array)=>{
        element.content=decodeURIComponent(element.content);
        messageContents.push(<MessageContent element={element}  key={index}/>)
        });
        return (<div className="messageList">{messageContents}</div>)
    }
}
export default MessageList;