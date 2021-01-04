import React, { useEffect, useState } from 'react'
import { Form, Card, Input, Button, message } from "antd";
import BraftEditor from 'braft-editor'
import { connect } from "react-redux";
import 'braft-editor/dist/index.css'

import { creatApi, getOneById, modifyOne } from "../../../services/products";
function Edit(props) {
    const id = props.location.pathname;
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState())
    
    const onFinish = (values) => {
        console.log('Success:', values);
        if (isNaN(id.charAt(id.length - 1))) {
            creatApi({ ...values, content: editorState.toHTML() })
                .then(response => {
                    message.info("保存成功");
                    props.history.push('/admin/products');
                })
                .catch(error => {
                    message.info(error);
                })
        } else {
            modifyOne(Number(id.charAt(id.length - 1)), { ...values, content: editorState.toHTML() })
                .then(response => {
                    message.info("保存成功");
                    props.history.push('/admin/products');
                })
                .catch(error => {
                    message.info(error);
                })
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.info("提交错误");
        console.log('Failed:', errorInfo);
    };

    const handleEditorChange = (v) => {
        setEditorState(v)
    }

    useEffect(() => {
        if (isNaN(id.charAt(id.length - 1))) {
        } else {
            getOneById(Number(id.charAt(id.length - 1)))
                .then(response => {
                    setEditorState(BraftEditor.createEditorState(response.data.content));
                });
        }
    }, []);

    return (
        <Card title={(isNaN(id.charAt(id.length - 1))) ? "添加项目" : "修改项目"}
            extra={<Button type="default" size="small" onClick={() => props.history.push("/admin/products")}>返回</Button>}>
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="名字" name="name" 
                initialValue={isNaN(id.charAt(id.length - 1)) ? "" : props.list[(id.charAt(id.length - 1))].name} rules={[{ required: true, message: "请输入项目名称" }]}>
                    <Input placeholder="请输入项目名称" />
                </Form.Item>
                <Form.Item label="项目进度" name="progress" 
                initialValue={isNaN(id.charAt(id.length - 1)) ? "" : props.list[(id.charAt(id.length - 1))].progress} rules={[{ required: true, message: '请输入项目进度' }, 
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                        if (value >= 0 && value <= 1) {
                            return Promise.resolve();
                        }
                        else
                            return Promise.reject('进度在0与1之间');
                    },
                }),]}>
                    <Input placeholder="请输入项目进度" />
                </Form.Item>
                <Form.Item label="详情"></Form.Item>
                <BraftEditor
                    value={editorState}
                    onChange={(e) => handleEditorChange(e)}/>
                <Form.Item >
                    <Button htmlType="submit" type="primary">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default connect(state => state.product)(Edit)