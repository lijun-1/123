import React, { useEffect } from 'react'
import { Card, Table, Button, Popconfirm, message } from "antd";
import { connect } from "react-redux";

import { listApi, delOne, modifyOne } from "../../../services/products";
import './list.css'
import { loadProduct } from "../../../store/actions/product";

function List(props) {
    const columns = [
        {
            title: '序号',
            key: 'id',
            width: 80,
            align: 'center',
            render: (txt, record, index) => index + 1
        },
        {
            title: '名字',
            dataIndex: 'name'
        },
        {
            title: '进度',
            dataIndex: 'progress'
        },
        {
            title: '状态',
            dataIndex: 'onDoing',
            render: (txt, record) => (record.progress === 1) ? "已完成" : (record.onDoing ? "进行中" : "暂停中")
        },
        {
            title: '操作',
            render: (txt, record, index) => {
                return (<div>
                    <Button type="primary" size="small" onClick={() => { props.history.push(`/admin/products/edit/${record.id}`) }}>
                        修改
                    </Button>
                    <Popconfirm title="确定删除此项？"
                        onCancel={() => message.info('用户取消删除')}
                        onConfirm={() => {
                            delOne(record.id)
                                .then(() => {
                                    props.dispatch(loadProduct({}))
                                })
                            message.info('删除成功')
                        }}>
                        <Button style={{ margin: "0 1rem" }} type="danger" size="small">删除</Button>
                    </Popconfirm>
                    <Button type="primary" size="small" onClick={() => props.history.push(`/admin/dashboard/${record.id}`)}>
                        详情
                    </Button>
                    <Button style={{ margin: "0 1rem" }} type="primary" size="small"
                        onClick={() => {
                            modifyOne(record.id, { id: record.id, name: record.name, progress: record.progress, content: record.content, onDoing: !record.onDoing })
                                .then(response => {
                                    listApi().then(value => {
                                        props.dispatch(loadProduct({}))
                                    })
                                })
                            }}>
                        {(record.progress === 1) ? "" : (record.onDoing ? "暂停" : "开始")}
                    </Button>
                </div>
                )
            }
        }
    ]

    useEffect(() => {
        props.dispatch(loadProduct({}))
    }, [])

    return (
        <Card title="项目列表" extra={<Button type="primary" size="small" onClick={() => props.history.push("/admin/products/edit")}>新增</Button>}>
            <Table rowClassName={record => (record.progress === 1) ? "over" : (record.onDoing ? "doing" : "stop")} rowKey="id" pagination={{ defaultPageSize: 5 }} columns={columns} bordered dataSource={props.list} />
        </Card>
    );
}

export default connect(state => state.product)(List)
