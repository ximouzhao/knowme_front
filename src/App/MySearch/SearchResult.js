import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import MessageContent from '../MessageBoard/MessageContent';
import ThinkContent from '../Think/ThinkContent';
class SearchResult extends Component {
    render() {
        let name = this.props.element.name == undefined ? "" : this.props.element.name;
        let detail;
        if (this.props.element.type == "ARTICLE") {
            detail = (<Card title={this.props.element.id + "  " + this.props.element.type + "  " + name} bordered={false}>
                <Link to={"/app/article/details/" + this.props.element.id} target="_blank">
                {this.props.element.content}
            </Link></Card >);
        } else if (this.props.element.type == "MESSAGE") {
            detail = (<MessageContent element={this.props.element} key={0} />);
        } else {
            detail = <ThinkContent element={this.props.element} key={0} loading={false} />
        }
        return (
            <div style={{ marginTop: 10 }}>
                <Row>
                    <Col span={24}>
                        {detail}
                    </Col>
                </Row>
            </div>
        );
    }
}
export default SearchResult;