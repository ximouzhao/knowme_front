import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import './WrappedAdvancedSearchForm.css';

class AdvancedSearchForm extends React.Component {
  state = {
    expand: true,
  };

  // To generate mock Form.Item
  getFields() {
    const count = 3;
    const { getFieldDecorator } = this.props.form;
    const children = [
      <Col  xs={24} sm={24} md={12} lg={12} xl={5} key={0} style={{ display:  'block'  }}>
          <Form.Item label={`ID`}>
            {getFieldDecorator(`ID`, {
              rules: [
                {
                  required: false,
                  message: '请输入必输项!',
                },
              ],
            })(<Input placeholder="请输入需要查询的ID" />)}
          </Form.Item>
        </Col>,
        <Col xs={24} sm={24} md={12} lg={12} xl={5} key={1} style={{ display:  'block' }}>
          <Form.Item label={`标题`} labelCol={{xs: {span: 0}}}>
            {getFieldDecorator(`标题`, {
              rules: [
                {
                  required: false,
                  message: '请输入必输项!',
                },
              ],
            })(<Input placeholder="请输入需要查询的标题" />)}
          </Form.Item>
      </Col>,
      <Col xs={24} sm={24} md={12} lg={12} xl={5} key={2} style={{ display: 'block' }}>
      <Form.Item label={`内容`}>
        {getFieldDecorator(`内容`, {
            rules: [
            {
              required: false,
              message: '请输入必输项!',
            },
            ],
          })(<Input placeholder="请输入需要查询的内容" />)}
        </Form.Item>
      </Col>
    ];
    return children;
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };
  newArticle=()=>{
    console.log(this.props.history);
    this.props.history.push('/admin/article/newArticle');
  }
  render() {
    return (
      <div>
          <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
            <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 16 }}>
              {this.getFields()}
              <Col  xs={24} sm={16} md={16} lg={16} xl={6} style={{ textAlign: 'left' ,display:'block'}}>
                  <Form.Item style={{display:'block'}} >
                    <Button  htmlType="submit">
                      查询
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                      清除
                    </Button>
                  </Form.Item>
              </Col>
              <Col xs={24} sm={4} md={4} lg={4} xl={3} style={{ textAlign: 'center' ,display:'block'}}>
                <Form.Item >
                  <Button type="primary" style={{}} onClick={this.newArticle}>
                            写文章
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
      </div>
      
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);

export default WrappedAdvancedSearchForm;