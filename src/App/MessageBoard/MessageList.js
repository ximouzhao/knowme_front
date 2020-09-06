import React,{Component} from 'react';
import MessageContent from './MessageContent'
import { message} from 'antd';
import './MessageList.css';

class MessageList extends Component{
    
    render(){
        let messageContents=[];
        this.props.list.forEach((element,index,array)=>{
            try{
                messageContents.push(<MessageContent element={element}  key={index}/>);
            }catch(err){
                message.error(err+'');
            }
        });
        return (<div className="messageList">{messageContents}</div>)
    }
}
export default MessageList;