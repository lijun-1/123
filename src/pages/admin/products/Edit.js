import React, {  useEffect,useState} from 'react'
import { Form, Card, Input, Button, message } from "antd";
import { creatApi, getOneById,modifyOne } from "../../../services/products";
import BraftEditor from 'braft-editor'
import { connect } from "react-redux";
// 引入编辑器样式
import 'braft-editor/dist/index.css'

function Edit(props) {
    const[editorState,setEditorState] = useState(BraftEditor.createEditorState())
    useEffect(() => {        
        if (isNaN(props.location.pathname.charAt(props.location.pathname.length - 1))) {
        } else {
            getOneById(Number(props.location.pathname.charAt(props.location.pathname.length - 1)))
            .then(response => {
            setEditorState(BraftEditor.createEditorState(response.data.content));
            });
        }
    },[]);



    const onFinish = (values) => {
        console.log('Success:', values);
       
        if (isNaN(props.location.pathname.charAt(props.location.pathname.length - 1))) {
            creatApi({...values,content:editorState.toHTML()})
            .then(response => {
                message.info("保存成功");
                props.history.push('/admin/products');
            })
            .catch(error => {
                message.info(error);
            })
        }else{
            modifyOne(Number(props.location.pathname.charAt(props.location.pathname.length - 1)),{...values,content:editorState.toHTML()})
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

    return (
        <Card title={(isNaN(props.location.pathname.charAt(props.location.pathname.length - 1)))?"添加项目":"修改项目"} 
        extra={<Button type="default" size="small" onClick={()=>props.history.push("/admin/products")}>返回</Button>}>
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="名字" name="name" initialValue={isNaN(props.location.pathname.charAt(props.location.pathname.length - 1))?"":props.list[(props.location.pathname.charAt(props.location.pathname.length - 1))].name} rules={[{ required: true, message: "请输入项目名称"}]}>
                    <Input placeholder="请输入项目名称" />
                </Form.Item>
                <Form.Item label="项目进度" name="progress" initialValue={isNaN(props.location.pathname.charAt(props.location.pathname.length - 1))?"":props.list[(props.location.pathname.charAt(props.location.pathname.length - 1))].progress}  rules={[{ required: true, message: '请输入项目进度' }, ({ getFieldValue }) => ({
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
                
                <Form.Item label="详情">
                
                </Form.Item>
                <BraftEditor
                    value={editorState}
                    onChange={(e)=>handleEditorChange(e)}
                   
                />
                
                <Form.Item >
                    <Button htmlType="submit" type="primary">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default  connect(state=>state.product)(Edit)