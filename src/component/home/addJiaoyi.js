/*
 * @Anthor: liangshuang15
 * @Description: 
 * @Date: 2022-06-13 19:43:00
 * @LastEditTime: 2022-08-01 19:39:46
 * @FilePath: /qianwanjihua/src/component/home/addJiaoyi.js
 */
import { Button, Form, Input, message, InputNumber } from 'antd';
import React from 'react';
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api';

const AddJiaoyi = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        values.planId = props.planId;
        const params = {
            url: api.addTransctionPlan,
            params: values
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                message.success('添加成功');
                if (props.getjiaoyiList !== undefined) {
                    props.getjiaoyiList();
                    props.closeModal();
                };
            } else {
                message.error(res.data.msg || '添加失败');
            }
        });
    }
    const handleChange = (value) => {
        const field = form.getFieldValue();
        form.setFieldsValue({
            planPurchaseAmount: field.planPurchaseNum * field.planPurchasePrice 
        });
    }
        return (
            <div>
                <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="计划名称"
                            name="name"
                            rules={[{ required: true, message: '请输入计划名称!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="买入价"
                            name="planPurchasePrice"
                            rules={[{ required: true, message: '请输入买入价!' }]}
                        >
                            <InputNumber onChange={handleChange}/>
                        </Form.Item>
                        <Form.Item
                            label="计划持股"
                            name="planPurchaseNum"
                            rules={[{ required: true, message: '请输入计划持股!' }]}
                        >
                            <InputNumber onChange={handleChange}/>
                        </Form.Item>
                        <Form.Item
                            label="计划买入金额"
                            name="planPurchaseAmount"
                            rules={[{ required: true, message: '请输入计划买入金额!' }]}
                        >
                        <InputNumber
                            readOnly={true}
                        />
                        </Form.Item>
                        <Form.Item
                            label="清仓价"
                            name="planCleanupPrice"
                            rules={[{ required: true, message: '请输入清仓价!' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                            提交
                            </Button>
                        </Form.Item>
                    </Form> 
            </div>
        )
    
}

export default AddJiaoyi;