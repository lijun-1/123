import React from 'react'
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { setToken } from "../utils/auth";
import "./login.css";
import { loginApi } from "../services/auth";

function Login(props) {
    const onFinish = (values) => {
        loginApi().then(value => {
            const userName = value.data.username;
            const password = value.data.password;
            if (userName === values.username && password === values.password) {
                setToken(values.username);
                props.history.push("/admin/products");
            } else {
                message.info("用户名或密码错误");
            }
        })
    };
    return (
        <Card title="登陆界面" className="login-form">
            <Form
                name="normal_login"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                    ]}>
                    <Input placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}>
                    <Input
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </Card>

    );
}

export default Login;
