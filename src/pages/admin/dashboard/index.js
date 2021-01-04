import React, {  useEffect,useState} from 'react'
import { Card,Form,Button} from "antd";
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { getOneById, modifyOne } from "../../../services/products";

function Index(props) {

    const[editorState,setEditorState] = useState(BraftEditor.createEditorState())
    useEffect(() => {        
        if (isNaN(props.location.pathname.charAt(props.location.pathname.length - 1))) {
        } else {
            getOneById(Number(props.location.pathname.charAt(props.location.pathname.length - 1)))
            .then(response => {
            console.log(response.data);
            setEditorState(BraftEditor.createEditorState(response.data.content));
            });
        }
    },[]);

    const handleEditorChange = (v) => {
        setEditorState(v)
    }
    const save = ()=>{
    props.history.push("/admin/products")
    getOneById(Number(props.location.pathname.charAt(props.location.pathname.length - 1)))
    .then(value=>{
        modifyOne(value.data.id,{id:value.data.id,name:value.data.name,progress:value.data.progress,content:editorState.toHTML(),onDoing:value.data.onDoing})   
    })
    }
    

    return (
        <Card title="项目详情" extra={
        <Button type="primary" size="small" onClick={()=>{props.history.push("/admin/products")}}>退出</Button>
        }>
            <Form >
            <BraftEditor
                   
                   value={editorState}
                   onChange={(e)=>handleEditorChange(e)} 
                   
                />
                <Form.Item >
                    <Button type="primary" onClick={save}>保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Index
