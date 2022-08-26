import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api';
import './login.css';
class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    onFinish = (values) => {
        const params = {
            url: api.login,
            params: values
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                const token = res?.data.data.token;
                if (token) {
                    const date = new Date();
                    date.setTime(date.getTime() + 30 * 24 * 3600 * 1000);
                    document.cookie = 'CUID=' + token + ';expires=' + date.toGMTString() + ';path=/';
                    window.location.href = '/'
                }
            } else {
                alert('登录失败')
            }
        });
      };
    render() {
        return (
            <div className="login-wrapper">
                <div className="login">
                    <div className="sy-name">
                        欢迎使用斗金系统
                    </div>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="userName"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                    </Form> 
                </div>
            </div>
        )
    }
};
export default Login;