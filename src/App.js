import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'antd/lib/button';
import ReactMarkdown from 'react-markdown';
import { Input } from 'antd';
import CodeBlock from './CodeBlock';
import sampleCode from './data/code';
import {getData} from './test/test';

class App extends Component {

  state ={value:sampleCode};
componentDidMount(){
  getData();

}
  hanldleTextAreaChange=(event)=>{
    if(event && event.target && event.target.value){
      let value=event.target.value;
      console.log(value);
      this.setState(()=>({value:value}));
    }
  };
  render() {
    const { TextArea } = Input;
    return (
      <div>
        <Button type="primary">保存</Button>
        <TextArea rows={4} onChange={event=>this.hanldleTextAreaChange(event)} />
   
          {React.createElement(ReactMarkdown, {
            source: this.state.value,
            renderers: {
              code: CodeBlock
            }
          })}
        <ReactMarkdown source={this.state.value}  renderers={{
            code: CodeBlock
        }}/>
<ReactMarkdown source={this.state.value}  renderers={{ code: CodeBlock }}/>
        <ReactMarkdown source={this.state.value}  renderers={{ code: CodeBlock }}/>
      </div>
    );
  }
}

export default App;
