import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { Card, Form, Button } from "antd";
import React, { useEffect, useState } from 'react'

import { getOneById, modifyOne } from "../../../services/products";

function Index(props) {

    const id = props.match.params.id;
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState())
    const handleEditorChange = (v) => { setEditorState(v) }

    const save = () => {
        props.history.push("/admin/products")
        getOneById(Number(id.charAt(id.length - 1)))
            .then(value => {
                modifyOne(value.data.id, {
                    id: value.data.id,
                    name: value.data.name,
                    progress: value.data.progress,
                    content: editorState.toHTML(),
                    onDoing: value.data.onDoing
                })
            })
    }

    useEffect(() => {
        if (isNaN(id.charAt(id.length - 1))) {
        } else {
            getOneById(Number(id.charAt(id.length - 1)))
                .then(response => {
                    console.log(response.data);
                    setEditorState(BraftEditor.createEditorState(response.data.content));
                });
        }
    }, []);

    return (
        <Card title="项目详情" extra={
            <Button type="primary" size="small" onClick={() => { props.history.push("/admin/products") }}>退出</Button>}>
            <Form >
                <BraftEditor
                    value={editorState}
                    onChange={(e) => handleEditorChange(e)} />
                <Form.Item >
                    <Button type="primary" onClick={save}>保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Index
