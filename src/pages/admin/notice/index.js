import React from 'react'
import { connect } from "react-redux";
import { Button, Card, List, Typography } from "antd";

const data = [
    "江畔何人初见月",
    "江月何年初照人",
    "人生代代无穷已",
    "江月年年望相似",
];

function index(props) {
    return (
        <Card title="通知中心" extra={<div>
            <Button onClick={() => props.dispatch({
                type: "READ_ALL"
            })}>全部已读</Button>
            <Button type="primary" style={{ margin: "0 1rem" }} onClick={() => { props.history.push('/admin/products') }}>退出</Button>
        </div>}>
            <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item style={{ display: 'flex', alignContent: 'space-between' }}>
                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        <Button size="small">已读</Button>
                    </List.Item>
                )}>
            </List>
        </Card>
    )
}

export default connect(state => state)(index);
